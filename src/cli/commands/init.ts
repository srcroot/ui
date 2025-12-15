import fs from "fs-extra"
import path from "path"
import chalk from "chalk"
import ora from "ora"
import prompts from "prompts"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface InitOptions {
  yes: boolean
  cwd: string
}

const UTILS_CONTENT = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

const CSS_VARIABLES = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`

const TAILWIND_CONFIG = `import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}

export default config
`

export async function init(options: InitOptions) {
  const cwd = path.resolve(options.cwd)

  console.log(chalk.cyan("\n🚀 Initializing srcroot-ui...\n"))

  // Check if this is a valid project
  const packageJsonPath = path.join(cwd, "package.json")
  if (!fs.existsSync(packageJsonPath)) {
    console.log(chalk.red("Error: No package.json found. Please run this in a project directory."))
    process.exit(1)
  }

  // Determine paths
  const srcDir = path.join(cwd, "src")
  const appDir = path.join(cwd, "app")
  const isAppRouter = fs.existsSync(appDir)

  const libDir = path.join(srcDir, "lib")
  const componentsDir = path.join(srcDir, "components", "ui")
  const globalsPath = isAppRouter
    ? path.join(appDir, "globals.css")
    : path.join(srcDir, "styles", "globals.css")

  if (!options.yes) {
    const response = await prompts([
      {
        type: "confirm",
        name: "proceed",
        message: `This will create files in ${chalk.cyan(cwd)}. Continue?`,
        initial: true,
      },
    ])

    if (!response.proceed) {
      console.log(chalk.yellow("Cancelled."))
      process.exit(0)
    }
  }

  const spinner = ora("Creating project structure...").start()

  try {
    // Create directories
    await fs.ensureDir(libDir)
    await fs.ensureDir(componentsDir)

    // Create utils.ts
    const utilsPath = path.join(libDir, "utils.ts")
    await fs.writeFile(utilsPath, UTILS_CONTENT)
    spinner.succeed(`Created ${chalk.cyan("src/lib/utils.ts")}`)

    // Create or update globals.css
    spinner.start("Setting up CSS variables...")
    const stylesDir = path.dirname(globalsPath)
    await fs.ensureDir(stylesDir)

    if (fs.existsSync(globalsPath)) {
      const existingCss = await fs.readFile(globalsPath, "utf-8")
      if (!existingCss.includes("--background:")) {
        await fs.writeFile(globalsPath, CSS_VARIABLES + "\n" + existingCss)
        spinner.succeed(`Updated ${chalk.cyan(path.relative(cwd, globalsPath))}`)
      } else {
        spinner.info(`CSS variables already exist in ${chalk.cyan(path.relative(cwd, globalsPath))}`)
      }
    } else {
      await fs.writeFile(globalsPath, CSS_VARIABLES)
      spinner.succeed(`Created ${chalk.cyan(path.relative(cwd, globalsPath))}`)
    }

    // Create tailwind.config.ts
    spinner.start("Setting up Tailwind config...")
    const tailwindConfigPath = path.join(cwd, "tailwind.config.ts")
    if (!fs.existsSync(tailwindConfigPath)) {
      await fs.writeFile(tailwindConfigPath, TAILWIND_CONFIG)
      spinner.succeed(`Created ${chalk.cyan("tailwind.config.ts")}`)
    } else {
      spinner.info(`${chalk.cyan("tailwind.config.ts")} already exists, skipping`)
    }

    // Check for required dependencies
    spinner.start("Checking dependencies...")
    const pkg = await fs.readJson(packageJsonPath)
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    const missing: string[] = []

    const requiredDeps = ["clsx", "tailwind-merge", "class-variance-authority", "lucide-react"]
    for (const dep of requiredDeps) {
      if (!deps[dep]) {
        missing.push(dep)
      }
    }

    if (missing.length > 0) {
      spinner.stop()
      const { install } = await prompts({
        type: "confirm",
        name: "install",
        message: `Missing dependencies: ${missing.join(", ")}. Install now?`,
        initial: true,
      })

      if (install) {
        spinner.start(`Installing dependencies...`)
        import("child_process").then(({ execSync }) => {
          execSync(`npm install ${missing.join(" ")}`, { stdio: "ignore", cwd })
          spinner.succeed("Dependencies installed")
        }).catch(() => {
          spinner.fail("Failed to install dependencies automatically.")
          console.log(chalk.dim(`\nPlease manually run: npm install ${missing.join(" ")}\n`))
        })
      } else {
        console.log(chalk.dim(`\nPlease manually run: npm install ${missing.join(" ")}\n`))
      }
    } else {
      spinner.succeed("All dependencies installed")
    }

    console.log(chalk.green("\n✅ Project initialized successfully!\n"))
    console.log("Next steps:")
    console.log(chalk.dim("  1. Install missing dependencies (if any)"))
    console.log(chalk.dim("  2. Run: npx srcroot-ui add button"))
    console.log()

  } catch (error) {
    spinner.fail("Failed to initialize project")
    console.error(error)
    process.exit(1)
  }
}
