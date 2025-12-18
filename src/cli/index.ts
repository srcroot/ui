import { Command } from "commander"
import chalk from "chalk"
import { init } from "./commands/init.js"
import { add } from "./commands/add.js"
import { list } from "./commands/list.js"
import { getPackageInfo } from "./utils/get-package-info.js"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
    const packageInfo = getPackageInfo()

    const program = new Command()
        .name("@srcroot/ui")
        .description("Add polymorphic, accessible UI components to your project")
        .version(
            packageInfo.version || "0.0.1",
            "-v, --version",
            "display the version number"
        )

    program
        .command("init")
        .description("Initialize your project with @srcroot/ui")
        .option("-y, --yes", "Skip confirmation prompts", false)
        .option("-t, --theme <theme>", "Color theme (slate, neutral, stone, zinc, gray)")
        .option("--cwd <path>", "Working directory", process.cwd())
        .action(init)

    program
        .command("add")
        .description("Add components to your project")
        .argument("[components...]", "Components to add")
        .option("-y, --yes", "Skip confirmation prompts", false)
        .option("-o, --overwrite", "Overwrite existing files", false)
        .option("-a, --all", "Add all available components", false)
        .option("--cwd <path>", "Working directory", process.cwd())
        .action(add)

    program
        .command("list")
        .description("List all available components")
        .action(list)

    // Custom help text or behavior when no command is provided
    if (process.argv.length < 3) {
        console.log(chalk.cyan(`
  @srcroot/ui v${packageInfo.version}
  
  A UI library with polymorphic, accessible components.
    `))
        program.outputHelp()
        console.log()
        return
    }

    program.parse()
}

main().catch((err) => {
    console.error("Results: ", err)
    process.exit(1)
})
