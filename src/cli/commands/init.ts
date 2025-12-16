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
  theme?: string
}

const UTILS_CONTENT = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

// Theme definitions
const THEMES: Record<string, { name: string; description: string; light: Record<string, string>; dark: Record<string, string> }> = {
  slate: {
    name: "Slate",
    description: "Cool gray with strong blue undertones (default)",
    light: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      card: "0 0% 100%",
      "card-foreground": "222.2 84% 4.9%",
      popover: "0 0% 100%",
      "popover-foreground": "222.2 84% 4.9%",
      primary: "222.2 47.4% 11.2%",
      "primary-foreground": "210 40% 98%",
      secondary: "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      muted: "210 40% 96.1%",
      "muted-foreground": "215.4 16.3% 46.9%",
      accent: "210 40% 96.1%",
      "accent-foreground": "222.2 47.4% 11.2%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 40% 98%",
      border: "214.3 31.8% 91.4%",
      input: "214.3 31.8% 91.4%",
      ring: "222.2 84% 4.9%",
    },
    dark: {
      background: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
      card: "222.2 84% 4.9%",
      "card-foreground": "210 40% 98%",
      popover: "222.2 84% 4.9%",
      "popover-foreground": "210 40% 98%",
      primary: "210 40% 98%",
      "primary-foreground": "222.2 47.4% 11.2%",
      secondary: "217.2 32.6% 17.5%",
      "secondary-foreground": "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      "muted-foreground": "215 20.2% 65.1%",
      accent: "217.2 32.6% 17.5%",
      "accent-foreground": "210 40% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "210 40% 98%",
      border: "217.2 32.6% 17.5%",
      input: "217.2 32.6% 17.5%",
      ring: "212.7 26.8% 83.9%",
    },
  },
  neutral: {
    name: "Neutral",
    description: "Pure gray, no undertones",
    light: {
      background: "0 0% 100%",
      foreground: "0 0% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "0 0% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "0 0% 3.9%",
      primary: "0 0% 9%",
      "primary-foreground": "0 0% 98%",
      secondary: "0 0% 96.1%",
      "secondary-foreground": "0 0% 9%",
      muted: "0 0% 96.1%",
      "muted-foreground": "0 0% 45.1%",
      accent: "0 0% 96.1%",
      "accent-foreground": "0 0% 9%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "0 0% 89.8%",
      input: "0 0% 89.8%",
      ring: "0 0% 3.9%",
    },
    dark: {
      background: "0 0% 3.9%",
      foreground: "0 0% 98%",
      card: "0 0% 3.9%",
      "card-foreground": "0 0% 98%",
      popover: "0 0% 3.9%",
      "popover-foreground": "0 0% 98%",
      primary: "0 0% 98%",
      "primary-foreground": "0 0% 9%",
      secondary: "0 0% 14.9%",
      "secondary-foreground": "0 0% 98%",
      muted: "0 0% 14.9%",
      "muted-foreground": "0 0% 63.9%",
      accent: "0 0% 14.9%",
      "accent-foreground": "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "0 0% 14.9%",
      input: "0 0% 14.9%",
      ring: "0 0% 83.1%",
    },
  },
  stone: {
    name: "Stone",
    description: "Warm gray with brown undertones",
    light: {
      background: "0 0% 100%",
      foreground: "24 9.8% 10%",
      card: "0 0% 100%",
      "card-foreground": "24 9.8% 10%",
      popover: "0 0% 100%",
      "popover-foreground": "24 9.8% 10%",
      primary: "24 9.8% 10%",
      "primary-foreground": "60 9.1% 97.8%",
      secondary: "60 4.8% 95.9%",
      "secondary-foreground": "24 9.8% 10%",
      muted: "60 4.8% 95.9%",
      "muted-foreground": "25 5.3% 44.7%",
      accent: "60 4.8% 95.9%",
      "accent-foreground": "24 9.8% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "60 9.1% 97.8%",
      border: "20 5.9% 90%",
      input: "20 5.9% 90%",
      ring: "24 9.8% 10%",
    },
    dark: {
      background: "24 9.8% 10%",
      foreground: "60 9.1% 97.8%",
      card: "24 9.8% 10%",
      "card-foreground": "60 9.1% 97.8%",
      popover: "24 9.8% 10%",
      "popover-foreground": "60 9.1% 97.8%",
      primary: "60 9.1% 97.8%",
      "primary-foreground": "24 9.8% 10%",
      secondary: "12 6.5% 15.1%",
      "secondary-foreground": "60 9.1% 97.8%",
      muted: "12 6.5% 15.1%",
      "muted-foreground": "24 5.4% 63.9%",
      accent: "12 6.5% 15.1%",
      "accent-foreground": "60 9.1% 97.8%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "60 9.1% 97.8%",
      border: "12 6.5% 15.1%",
      input: "12 6.5% 15.1%",
      ring: "24 5.7% 82.9%",
    },
  },
  zinc: {
    name: "Zinc",
    description: "Cool gray with subtle blue undertones",
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "240 10% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "240 10% 3.9%",
      primary: "240 5.9% 10%",
      "primary-foreground": "0 0% 98%",
      secondary: "240 4.8% 95.9%",
      "secondary-foreground": "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      "muted-foreground": "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      "accent-foreground": "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: "240 10% 3.9%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      card: "240 10% 3.9%",
      "card-foreground": "0 0% 98%",
      popover: "240 10% 3.9%",
      "popover-foreground": "0 0% 98%",
      primary: "0 0% 98%",
      "primary-foreground": "240 5.9% 10%",
      secondary: "240 3.7% 15.9%",
      "secondary-foreground": "0 0% 98%",
      muted: "240 3.7% 15.9%",
      "muted-foreground": "240 5% 64.9%",
      accent: "240 3.7% 15.9%",
      "accent-foreground": "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: "240 4.9% 83.9%",
    },
  },
  gray: {
    name: "Gray",
    description: "True neutral gray",
    light: {
      background: "0 0% 100%",
      foreground: "224 71.4% 4.1%",
      card: "0 0% 100%",
      "card-foreground": "224 71.4% 4.1%",
      popover: "0 0% 100%",
      "popover-foreground": "224 71.4% 4.1%",
      primary: "220.9 39.3% 11%",
      "primary-foreground": "210 20% 98%",
      secondary: "220 14.3% 95.9%",
      "secondary-foreground": "220.9 39.3% 11%",
      muted: "220 14.3% 95.9%",
      "muted-foreground": "220 8.9% 46.1%",
      accent: "220 14.3% 95.9%",
      "accent-foreground": "220.9 39.3% 11%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 20% 98%",
      border: "220 13% 91%",
      input: "220 13% 91%",
      ring: "224 71.4% 4.1%",
    },
    dark: {
      background: "224 71.4% 4.1%",
      foreground: "210 20% 98%",
      card: "224 71.4% 4.1%",
      "card-foreground": "210 20% 98%",
      popover: "224 71.4% 4.1%",
      "popover-foreground": "210 20% 98%",
      primary: "210 20% 98%",
      "primary-foreground": "220.9 39.3% 11%",
      secondary: "215 27.9% 16.9%",
      "secondary-foreground": "210 20% 98%",
      muted: "215 27.9% 16.9%",
      "muted-foreground": "217.9 10.6% 64.9%",
      accent: "215 27.9% 16.9%",
      "accent-foreground": "210 20% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "210 20% 98%",
      border: "215 27.9% 16.9%",
      input: "215 27.9% 16.9%",
      ring: "216 12.2% 83.9%",
    },
  },
}

function generateCssVariables(themeName: string): string {
  const theme = THEMES[themeName]
  if (!theme) return ""

  const lightVars = Object.entries(theme.light)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join("\n")

  const darkVars = Object.entries(theme.dark)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join("\n")

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
${lightVars}
    --radius: 0.5rem;
  }

  .dark {
${darkVars}
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

@layer utilities {
  @keyframes accordion-down {
    from { height: 0; }
    to { height: var(--radix-accordion-content-height); }
  }
  @keyframes accordion-up {
    from { height: var(--radix-accordion-content-height); }
    to { height: 0; }
  }
  .animate-accordion-down {
    animation: accordion-down 0.2s ease-out;
  }
  .animate-accordion-up {
    animation: accordion-up 0.2s ease-out;
  }
}
`
}

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
  const srcDir = fs.existsSync(path.join(cwd, "src")) ? path.join(cwd, "src") : cwd
  const appDir = path.join(srcDir, "app")
  const isAppRouter = fs.existsSync(appDir)

  // Adjust paths based on src existence
  const libDir = path.join(srcDir, "lib")
  const componentsDir = path.join(srcDir, "components", "ui")
  const globalsPath = isAppRouter
    ? path.join(appDir, "globals.css")
    : path.join(srcDir, "styles", "globals.css")

  // Theme selection
  let selectedTheme = options.theme || "slate"

  if (!options.yes && !options.theme) {
    const themeChoices = Object.entries(THEMES).map(([key, theme]) => ({
      title: `${theme.name} - ${chalk.dim(theme.description)}`,
      value: key,
    }))

    const themeResponse = await prompts({
      type: "select",
      name: "theme",
      message: "Which color theme would you like to use?",
      choices: themeChoices,
      initial: 0, // slate is first
    })

    if (themeResponse.theme) {
      selectedTheme = themeResponse.theme
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
    spinner.succeed(`Created ${chalk.cyan(path.relative(cwd, utilsPath))}`)

    // Create or update globals.css with selected theme
    spinner.start(`Setting up ${chalk.cyan(THEMES[selectedTheme].name)} theme...`)
    const stylesDir = path.dirname(globalsPath)
    await fs.ensureDir(stylesDir)

    const cssContent = generateCssVariables(selectedTheme)
    await fs.writeFile(globalsPath, cssContent)
    spinner.succeed(`Updated ${chalk.cyan(path.relative(cwd, globalsPath))} with ${chalk.cyan(THEMES[selectedTheme].name)} theme`)

    // Create tailwind.config.ts
    spinner.start("Setting up Tailwind config...")
    const tailwindConfigPath = path.join(cwd, "tailwind.config.ts")
    await fs.writeFile(tailwindConfigPath, TAILWIND_CONFIG)
    spinner.succeed(`Created ${chalk.cyan("tailwind.config.ts")}`)

    // Check for required dependencies
    spinner.start("Checking dependencies...")
    const pkg = await fs.readJson(packageJsonPath)
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    const missing: string[] = []

    // Deps to check (key) and install command (value)
    const requiredDeps: Record<string, string> = {
      "clsx": "clsx@2.1.1",
      "tailwind-merge": "tailwind-merge@3.4.0",
      "class-variance-authority": "class-variance-authority@0.7.1",
      "lucide-react": "lucide-react@0.561.0"
    }

    for (const [depName, installCmd] of Object.entries(requiredDeps)) {
      if (!deps[depName]) {
        missing.push(installCmd)
      }
    }

    if (missing.length > 0) {
      spinner.text = `Installing dependencies: ${missing.join(", ")}...`
      try {
        const { execSync } = await import("child_process")
        execSync(`npm install ${missing.join(" ")}`, { stdio: "ignore", cwd })
        spinner.succeed("Dependencies installed")
      } catch {
        spinner.fail("Failed to install dependencies automatically")
        console.log(chalk.dim(`\nPlease manually run: npm install ${missing.join(" ")}\n`))
      }
    } else {
      spinner.succeed("All dependencies already installed")
    }

    // Success message at the end
    console.log(chalk.green("\n✅ Project initialized successfully!\n"))
    console.log(`Theme: ${chalk.cyan(THEMES[selectedTheme].name)}`)
    console.log("\nNext steps:")
    console.log(chalk.dim("  npx @srcroot/ui add button"))
    console.log(chalk.dim("  npx @srcroot/ui add --all"))
    console.log()

  } catch (error) {
    spinner.fail("Failed to initialize project")
    console.error(error)
    process.exit(1)
  }
}

