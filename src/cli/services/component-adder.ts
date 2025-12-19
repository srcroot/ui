import fs from "fs-extra"
import path from "path"
import ora from "ora"
import prompts from "prompts"
import { execa } from "execa"
import { fileURLToPath } from "url"
import { REGISTRY, type ComponentName } from "../registry.js"
import { logger } from "../utils/logger.js"
import { getPackageManager } from "../utils/get-package-manager.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class ComponentAdder {
    private cwd: string
    private options: {
        overwrite: boolean
        all: boolean
    }

    constructor(cwd: string, options: { overwrite: boolean; all: boolean }) {
        this.cwd = cwd
        this.options = options
    }

    async add(components: string[]) {
        // Resolve components if --all or valid selection
        components = await this.resolveComponents(components)

        // Validate and split valid/invalid
        const { valid, invalid } = this.validateComponents(components)

        if (invalid.length > 0) {
            logger.error(`Unknown components: ${invalid.join(", ")}`)
            console.log("\nRun '@srcroot/ui list' to see available components.")
            process.exit(1)
        }

        // Resolve dependencies (internal components and external packages)
        const { componentDeps, packageDeps } = this.resolveDependencies(valid)

        // Log plan
        this.logPlan(componentDeps, packageDeps)

        // Install external dependencies
        if (packageDeps.size > 0) {
            await this.installPackages(Array.from(packageDeps))
        }

        // Copy components
        await this.copyComponents(Array.from(componentDeps))

        logger.success("\n✅ Components added successfully!\n")
    }

    private async resolveComponents(components: string[]): Promise<string[]> {
        if (this.options.all) {
            return Object.keys(REGISTRY)
        }

        if (components.length === 0) {
            const { items } = await prompts({
                type: "multiselect",
                name: "items",
                message: "Which components would you like to add?",
                hint: "Space to select. A to toggle all. Enter to submit.",
                instructions: false,
                choices: Object.keys(REGISTRY).map((name) => ({
                    title: name,
                    value: name,
                })),
            })

            if (!items || items.length === 0) {
                logger.warn("No components selected.")
                process.exit(0)
            }
            return items
        }

        return components
    }

    private validateComponents(components: string[]) {
        const valid: ComponentName[] = []
        const invalid: string[] = []

        for (const comp of components) {
            if (comp in REGISTRY) {
                valid.push(comp as ComponentName)
            } else {
                invalid.push(comp)
            }
        }
        return { valid, invalid }
    }

    private resolveDependencies(components: ComponentName[]) {
        const componentDeps = new Set<ComponentName>()
        const packageDeps = new Set<string>()

        const resolve = (name: ComponentName) => {
            if (componentDeps.has(name)) return
            componentDeps.add(name)

            const comp = REGISTRY[name]

            // Internal dependencies
            if (comp.dependencies) {
                for (const dep of comp.dependencies) {
                    resolve(dep)
                }
            }

            // External package dependencies
            if (comp.registryDependencies) {
                for (const pkg of comp.registryDependencies) {
                    packageDeps.add(pkg)
                }
            }
        }

        for (const comp of components) {
            resolve(comp)
        }

        return { componentDeps, packageDeps }
    }

    private logPlan(componentDeps: Set<ComponentName>, packageDeps: Set<string>) {
        const componentsToAdd = Array.from(componentDeps)
        const packagesToInstall = Array.from(packageDeps)

        if (componentsToAdd.length > 10) {
            logger.info(`\n📦 Adding ${componentsToAdd.length} components...\n`)
        } else {
            logger.info("\n📦 Adding components:\n")
            componentsToAdd.forEach((name) => {
                console.log(`  - ${name}`)
            })
        }

        if (packagesToInstall.length > 0) {
            logger.info("\n📦 Installing dependencies:\n")
            packagesToInstall.forEach((pkg) => {
                console.log(`  - ${pkg}`)
            })
        }

        console.log()
    }

    private async installPackages(packages: string[]) {
        const packageManager = getPackageManager(this.cwd)
        const spinner = ora("Installing dependencies...").start()
        const installCmd = packageManager === "npm" ? "install" : "add"

        try {
            await execa(packageManager, [installCmd, ...packages], {
                cwd: this.cwd,
            })
            spinner.succeed("Dependencies installed")
        } catch (error) {
            spinner.fail("Failed to install dependencies")
            logger.error(error)

            // Fallback instruction
            logger.warn(`\nPlease manually install: ${packages.join(" ")}`)
        }
    }

    private async copyComponents(components: ComponentName[]) {
        const spinner = ora("Adding components...").start()

        // Detect component path
        const hasSrc = fs.existsSync(path.join(this.cwd, "src"))
        const srcPath = hasSrc ? path.join(this.cwd, "src") : this.cwd
        const componentsDir = path.join(srcPath, "components", "ui")

        try {
            await fs.ensureDir(componentsDir)

            for (const name of components) {
                const comp = REGISTRY[name]
                const fileName = path.basename(comp.file)
                const targetPath = path.join(componentsDir, fileName)

                if (fs.existsSync(targetPath) && !this.options.overwrite) {
                    spinner.stop()
                    const { overwrite } = await prompts({
                        type: "confirm",
                        name: "overwrite",
                        message: `${fileName} already exists. Overwrite?`,
                        initial: false
                    })

                    if (!overwrite) {
                        spinner.info(`Skipped ${fileName}`)
                        spinner.start("Adding components...")
                        continue
                    }
                    spinner.start("Adding components...")
                }

                // Get component source from registry folder
                // We assume this code runs from dist/cli/services or similar, so we need to go up to root then src/registry
                // Adjust path resolution relative to where this file ends up in dist
                // __dirname in compiled code usually points to dist/cli/services
                // registry files are in src/registry (source) or dist/registry (if copied)
                // For this dev environment, we point to source
                const registryPath = path.resolve(__dirname, "..", "..", "registry", comp.file)

                if (!fs.existsSync(registryPath)) {
                    spinner.warn(`Registry file not found for ${name}: ${registryPath}`)
                    continue
                }

                const content = await fs.readFile(registryPath, "utf-8")
                await fs.writeFile(targetPath, content)

                if (components.length > 10) {
                    spinner.text = `Adding ${fileName}...`
                } else {
                    spinner.succeed(`Added ${fileName}`)
                }
            }

            if (components.length > 10) {
                spinner.succeed(`Added ${components.length} components`)
            }

        } catch (error) {
            spinner.fail("Failed to add components")
            console.error(error)
            process.exit(1)
        }
    }
}
