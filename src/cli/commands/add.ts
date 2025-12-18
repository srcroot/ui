import fs from "fs-extra"
import path from "path"
import chalk from "chalk"
import ora from "ora"
import prompts from "prompts"
import { fileURLToPath } from "url"
import { REGISTRY, type ComponentName } from "../registry.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface AddOptions {
    yes: boolean
    overwrite: boolean
    all: boolean
    cwd: string
}

export async function add(components: string[], options: AddOptions) {
    const cwd = path.resolve(options.cwd)

    // If --all flag, add all components
    if (options.all) {
        components = Object.keys(REGISTRY)
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
            console.log(chalk.yellow("No components selected."))
            process.exit(0)
        }

        components = items
    }

    // Validate component names
    const validComponents: ComponentName[] = []
    const invalidComponents: string[] = []

    for (const comp of components) {
        if (comp in REGISTRY) {
            validComponents.push(comp as ComponentName)
        } else {
            invalidComponents.push(comp)
        }
    }

    if (invalidComponents.length > 0) {
        console.log(chalk.red(`Unknown components: ${invalidComponents.join(", ")}`))
        console.log(chalk.dim("\nRun '@srcroot/ui list' to see available components."))
        process.exit(1)
    }

    // Resolve dependencies
    const toInstall = new Set<ComponentName>()

    function resolveDeps(name: ComponentName) {
        if (toInstall.has(name)) return
        toInstall.add(name)

        const comp = REGISTRY[name]
        if (comp.dependencies) {
            for (const dep of comp.dependencies) {
                resolveDeps(dep)
            }
        }
    }

    for (const comp of validComponents) {
        resolveDeps(comp)
    }

    const componentsToAdd = Array.from(toInstall)

    if (componentsToAdd.length > 10) {
        console.log(chalk.cyan(`\n📦 Adding ${componentsToAdd.length} components...\n`))
    } else {
        console.log(chalk.cyan("\n📦 Adding components:\n"))
        componentsToAdd.forEach((name) => {
            console.log(chalk.dim(`  - ${name}`))
        })
    }
    console.log()



    const spinner = ora("Adding components...").start()

    // Detect component path
    const hasSrc = fs.existsSync(path.join(cwd, "src"))
    const srcPath = hasSrc ? path.join(cwd, "src") : cwd
    const componentsDir = path.join(srcPath, "components", "ui")

    try {
        await fs.ensureDir(componentsDir)

        for (const name of componentsToAdd) {
            const comp = REGISTRY[name]
            const targetPath = path.join(componentsDir, comp.file)

            if (fs.existsSync(targetPath) && !options.overwrite) {
                spinner.stop()
                const { overwrite } = await prompts({
                    type: "confirm",
                    name: "overwrite",
                    message: `${chalk.cyan(comp.file)} already exists. Overwrite?`,
                    initial: false
                })

                if (!overwrite) {
                    spinner.info(`Skipped ${chalk.cyan(comp.file)}`)
                    spinner.start("Adding components...")
                    continue
                }
                spinner.start("Adding components...")
            }

            // Get component source from registry folder
            // When installed via npx: node_modules/@srcroot/ui/dist/index.js
            // Registry is at: node_modules/@srcroot/ui/registry/
            const registryPath = path.resolve(__dirname, "..", "src", "registry", comp.file)

            if (!fs.existsSync(registryPath)) {
                spinner.warn(`Registry file not found for ${name}: ${registryPath}`)
                continue
            }

            const content = await fs.readFile(registryPath, "utf-8")
            await fs.writeFile(targetPath, content)

            if (componentsToAdd.length > 10) {
                spinner.text = `Adding ${chalk.cyan(comp.file)}...`
            } else {
                spinner.succeed(`Added ${chalk.cyan(comp.file)}`)
            }
        }

        if (componentsToAdd.length > 10) {
            spinner.succeed(`Added ${componentsToAdd.length} components`)
        }

        console.log(chalk.green("\n✅ Components added successfully!\n"))

    } catch (error) {
        spinner.fail("Failed to add components")
        console.error(error)
        process.exit(1)
    }
}
