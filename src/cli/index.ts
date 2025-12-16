import { Command } from "commander"
import { init } from "./commands/init.js"
import { add } from "./commands/add.js"
import { list } from "./commands/list.js"

const program = new Command()

program
    .name("@srcroot/ui")
    .description("Add polymorphic, accessible UI components to your project")
    .version("0.0.12")

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

program.parse()
