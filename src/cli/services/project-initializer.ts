import fs from "fs-extra"
import path from "path"
import chalk from "chalk"
import ora from "ora"
import prompts from "prompts"
import { fileURLToPath } from "url"
import { ThemeService } from "./theme-service.js"
import { TAILWIND_CONFIG } from "../utils/templates.js"

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
        console.log(chalk.cyan("\n🚀 Initializing @srcroot/ui...\n"))

        await this.validateEnvironment()
        await this.detectConfiguration()
        await this.promptUser()
        await this.scaffold()
        this.printSuccess()
    }

    private async validateEnvironment() {
        const cwd = path.resolve(this.options.cwd)
        const packageJsonPath = path.join(cwd, "package.json")

        if (!fs.existsSync(packageJsonPath)) {
            console.log(chalk.red("Error: No package.json found. Please run this in a project directory."))
            process.exit(1)
        }

        const pkg = await fs.readJson(packageJsonPath)
        const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

        if (!allDeps["react"]) {
            console.log(chalk.red("Error: React not found in dependencies. Please initialize this in a React project."))
            process.exit(1)
        }
    }

    private async detectConfiguration() {
        const cwd = path.resolve(this.options.cwd)

        // Detect Package Manager
        const userAgent = process.env.npm_config_user_agent || ""
        const isYarn = userAgent.includes("yarn")
        const isPnpm = userAgent.includes("pnpm")
        const isBun = userAgent.includes("bun")
        const packageManager = isPnpm ? "pnpm" : isYarn ? "yarn" : isBun ? "bun" : "npm"
        const installCmd = isPnpm ? "add" : isYarn ? "add" : isBun ? "add" : "install"

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
                console.log(chalk.yellow("Warning: No themes found in registry. Using default."))
                this.config.selectedTheme = selectedTheme
                return
            }

            const themeChoices = availableThemes.map((theme) => ({
                title: `${theme.name} - ${chalk.dim(theme.description)}`,
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
            const registryUtilsPath = path.resolve(__dirname, "..", "src", "registry", "lib", "utils.ts")
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
            spinner.succeed(`Created ${chalk.cyan(path.relative(cfg.cwd, utilsPath))}`)

            // Create/Update globals.css using ThemeService
            spinner.start(`Setting up ${chalk.cyan(cfg.selectedTheme)} theme...`)
            const stylesDir = path.dirname(cfg.globalsPath)
            await fs.ensureDir(stylesDir)

            try {
                const cssContent = await this.themeService.getThemeCss(cfg.selectedTheme, cfg.isTailwind4)
                await fs.writeFile(cfg.globalsPath, cssContent)
                spinner.succeed(`Updated ${chalk.cyan(path.relative(cfg.cwd, cfg.globalsPath))} with ${chalk.cyan(cfg.selectedTheme)} theme (${cfg.isTailwind4 ? "Tailwind 4" : "Tailwind 3"})`)
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
                spinner.succeed(`Created ${chalk.cyan("tailwind.config.ts")}`)
            } else {
                spinner.info(`Tailwind 4 detected - skipping ${chalk.cyan("tailwind.config.ts")}`)
            }

        } catch (error) {
            spinner.fail("Failed to initialize project")
            console.error(error)
            process.exit(1)
        }
    }

    private printSuccess() {
        const cfg = this.config as ProjectConfig

        console.log(chalk.green("\n✅ Project initialized successfully!\n"))
        console.log(`Theme: ${chalk.cyan(cfg.selectedTheme)}`)
        console.log(`Tailwind: ${chalk.cyan(cfg.isTailwind4 ? "v4" : "v3")}`)

        const requiredDeps = [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
            "react-icons"
        ]

        if (!cfg.isTailwind4) {
            requiredDeps.push("tailwindcss-animate")
        }

        console.log(chalk.cyan("\n📦 Required dependencies:"))
        console.log(chalk.dim(`  ${cfg.packageManager} ${cfg.installCmd} ${requiredDeps.join(" ")}`))

        console.log("\n✨ Next steps:")
        console.log(chalk.dim("  1. Install dependencies (command above)"))
        console.log(chalk.dim("  2. npx @srcroot/ui add button"))
        console.log(chalk.dim("  3. npx @srcroot/ui add --all"))
        console.log()
    }
}
