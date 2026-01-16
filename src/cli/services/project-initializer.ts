import fs from "fs-extra"
import path from "path"
import ora from "ora"
import prompts from "prompts"
import { fileURLToPath } from "url"
import { execa } from "execa"
import { ThemeService } from "./theme-service.js"
import { TAILWIND_CONFIG } from "../utils/templates.js"
import { getPackageManager } from "../utils/get-package-manager.js"
import { getPackageInfo } from "../utils/get-package-info.js"
import { logger } from "../utils/logger.js"
import { getRegistryPath } from "../utils/get-registry-path.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export interface InitOptions {
    yes: boolean
    cwd: string
    theme?: string
}

interface ProjectConfig {
    cwd: string
    packageManager: string
    installCmd: string
    isTailwind4: boolean
    hasSrc: boolean
    srcPath: string
    appPath: string
    pagesPath: string
    hasAppDir: boolean
    hasPagesDir: boolean
    libDir: string
    componentsDir: string
    globalsPath: string
    selectedTheme: string
}

export class ProjectInitializer {
    private options: InitOptions
    private config: Partial<ProjectConfig> = {}
    private themeService: ThemeService

    constructor(options: InitOptions) {
        this.options = options
        this.themeService = new ThemeService()
    }

    public async run() {
        logger.info("\n🚀 Initializing @srcroot/ui...\n")

        await this.validateEnvironment()
        await this.detectConfiguration()
        await this.promptUser()
        await this.scaffold()
        await this.installDependencies()
        this.printSuccess()
    }

    private async validateEnvironment() {
        const cwd = path.resolve(this.options.cwd)
        const packageJsonPath = path.join(cwd, "package.json")

        if (!fs.existsSync(packageJsonPath)) {
            logger.error("Error: No package.json found. Please run this in a project directory.")
            process.exit(1)
        }

        const pkg = await fs.readJson(packageJsonPath)
        const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

        if (!allDeps["react"]) {
            logger.error("Error: React not found in dependencies. Please initialize this in a React project.")
            process.exit(1)
        }
    }

    private async detectConfiguration() {
        const cwd = path.resolve(this.options.cwd)

        // Detect Package Manager
        const packageManager = getPackageManager(cwd)
        const installCmd = packageManager === "npm" ? "install" : "add"

        // Detect Tailwind Version
        const pkg = await fs.readJson(path.join(cwd, "package.json"))
        const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }
        const tailwindVersion = allDeps["tailwindcss"] || ""
        const isTailwind4 = tailwindVersion.includes("^4") || tailwindVersion.startsWith("4") || allDeps["@tailwindcss/postcss"]

        // Detect Paths
        const hasSrc = fs.existsSync(path.join(cwd, "src"))
        const srcPath = hasSrc ? path.join(cwd, "src") : cwd
        const appPath = path.join(srcPath, "app")
        const pagesPath = path.join(srcPath, "pages")
        const hasAppDir = fs.existsSync(appPath)
        const hasPagesDir = fs.existsSync(pagesPath)
        const libDir = path.join(srcPath, "lib")
        const componentsDir = path.join(srcPath, "components", "ui")

        // Find globals.css
        let globalsPath = ""
        if (hasAppDir) {
            if (fs.existsSync(path.join(appPath, "globals.css"))) globalsPath = path.join(appPath, "globals.css")
            else if (fs.existsSync(path.join(appPath, "global.css"))) globalsPath = path.join(appPath, "global.css")
            else globalsPath = path.join(appPath, "globals.css")
        } else if (hasPagesDir) {
            const stylesPath = path.join(srcPath, "styles")
            if (fs.existsSync(path.join(stylesPath, "globals.css"))) globalsPath = path.join(stylesPath, "globals.css")
            else if (fs.existsSync(path.join(stylesPath, "global.css"))) globalsPath = path.join(stylesPath, "global.css")
            else globalsPath = path.join(stylesPath, "globals.css")
        } else {
            globalsPath = path.join(srcPath, "globals.css")
        }

        this.config = {
            cwd,
            packageManager,
            installCmd,
            isTailwind4,
            hasSrc,
            srcPath,
            appPath,
            pagesPath,
            hasAppDir,
            hasPagesDir,
            libDir,
            componentsDir,
            globalsPath
        }
    }

    private async promptUser() {
        let selectedTheme = this.options.theme || "slate"

        if (!this.options.yes && !this.options.theme) {
            const availableThemes = this.themeService.getAvailableThemes()

            if (availableThemes.length === 0) {
                logger.warn("Warning: No themes found in registry. Using default.")
                this.config.selectedTheme = selectedTheme
                return
            }

            const themeChoices = availableThemes.map((theme) => ({
                title: theme.name,
                value: theme.file.replace(".css", ""),
            }))

            const themeResponse = await prompts({
                type: "select",
                name: "theme",
                message: "Which color theme would you like to use?",
                choices: themeChoices,
                initial: 0,
            })

            if (themeResponse.theme) {
                selectedTheme = themeResponse.theme
            }
        }

        this.config.selectedTheme = selectedTheme
    }

    private async scaffold() {
        const spinner = ora("Creating project structure...").start()
        const cfg = this.config as ProjectConfig

        try {
            await fs.ensureDir(cfg.libDir)
            await fs.ensureDir(cfg.componentsDir)

            // Create utils.ts
            const utilsPath = path.join(cfg.libDir, "utils.ts")
            const registryUtilsPath = path.join(getRegistryPath(), "lib", "utils.ts")
            let utilsContent = ""

            if (fs.existsSync(registryUtilsPath)) {
                utilsContent = await fs.readFile(registryUtilsPath, "utf-8")
            } else {
                // Fallback
                utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
                spinner.warn(`Could not find registry/utils.ts, using fallback content.`)
            }

            await fs.writeFile(utilsPath, utilsContent)
            spinner.succeed(`Created ${path.relative(cfg.cwd, utilsPath)}`)

            // Create/Update globals.css using ThemeService
            spinner.start(`Setting up ${cfg.selectedTheme} theme...`)
            const stylesDir = path.dirname(cfg.globalsPath)
            await fs.ensureDir(stylesDir)

            try {
                const cssContent = await this.themeService.getThemeCss(cfg.selectedTheme, cfg.isTailwind4)
                await fs.writeFile(cfg.globalsPath, cssContent)
                spinner.succeed(`Updated ${path.relative(cfg.cwd, cfg.globalsPath)} with ${cfg.selectedTheme} theme (${cfg.isTailwind4 ? "Tailwind 4" : "Tailwind 3"})`)
            } catch (error) {
                spinner.fail(`Failed to load theme: ${cfg.selectedTheme}`)
                console.error(error)
                process.exit(1)
            }

            // Create tailwind.config.ts
            if (!cfg.isTailwind4) {
                spinner.start("Setting up Tailwind config...")
                const tailwindConfigPath = path.join(cfg.cwd, "tailwind.config.ts")
                await fs.writeFile(tailwindConfigPath, TAILWIND_CONFIG)
                spinner.succeed(`Created tailwind.config.ts`)
                // Skip tailwind.config.ts for TW4 (no message needed)
            }

            // Create srcroot.config.json
            const packageInfo = getPackageInfo()
            const configObj = {
                version: packageInfo.version || "0.0.0",
                theme: cfg.selectedTheme,
                paths: {
                    components: path.relative(cfg.cwd, cfg.componentsDir),
                    utils: path.relative(cfg.cwd, utilsPath)
                }
            }

            await fs.writeJSON(path.join(cfg.cwd, "srcroot.config.json"), configObj, { spaces: 2 })
            spinner.succeed("Created srcroot.config.json")

        } catch (error) {
            spinner.fail("Failed to initialize project")
            console.error(error)
            process.exit(1)
        }
    }

    private async installDependencies() {
        const cfg = this.config as ProjectConfig
        const spinner = ora("Checking dependencies...").start()

        const deps = [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
            "react-icons"
        ]

        if (!cfg.isTailwind4) {
            deps.push("tailwindcss-animate")
        }

        try {
            const packageJsonPath = path.join(cfg.cwd, "package.json")
            const pkg = await fs.readJson(packageJsonPath)
            const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

            const missingDeps = deps.filter(dep => !allDeps[dep])

            if (missingDeps.length === 0) {
                spinner.succeed("Dependencies already installed")
                return
            }

            spinner.text = "Installing dependencies..."

            await execa(cfg.packageManager, [cfg.installCmd, ...missingDeps], {
                cwd: cfg.cwd,
                stdio: "pipe"
            })
            spinner.succeed(`Installed ${missingDeps.length} dependencies`)
        } catch (error) {
            spinner.fail("Failed to install dependencies")
            const missingDeps = deps // Fallback to all deps if something failed before filtering, or re-calculate if possible, but safe to just show the intent
            logger.warn(`\nManually run: ${cfg.packageManager} ${cfg.installCmd} ${missingDeps.join(" ")}`)
        }
    }

    private printSuccess() {
        logger.success("\n✅ Project initialized successfully!\n")

        console.log("✨ Next steps:")
        console.log("  1. npx @srcroot/ui add --all")
        console.log()
    }
}
