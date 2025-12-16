import chalk from "chalk"
import { REGISTRY } from "../registry.js"

export async function list() {
    console.log(chalk.cyan("\n📦 Available components:\n"))

    const categories: Record<string, string[]> = {
        "Core": [],
        "Typography": [],
        "Forms": [],
        "Layout": [],
        "Data Display": [],
        "Overlay / Feedback": [],
        "Navigation": [],
    }

    for (const [name, comp] of Object.entries(REGISTRY)) {
        if (categories[comp.category]) {
            categories[comp.category].push(name)
        }
    }

    for (const [category, components] of Object.entries(categories)) {
        if (components.length === 0) continue

        console.log(chalk.bold.white(`  ${category}`))
        components.forEach((name) => {
            const comp = REGISTRY[name as keyof typeof REGISTRY]
            console.log(chalk.dim(`    - ${name}`) + chalk.gray(` (${comp.description})`))
        })
        console.log()
    }

    console.log(chalk.dim("Usage: npx @srcroot/ui add <component>\n"))
}
