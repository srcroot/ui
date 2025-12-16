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

// Generate CSS for Tailwind 3
function generateCssVariablesV3(themeName: string): string {
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
    --sidebar-width: 16rem;
    --sidebar-width-mobile: 18rem;
    --sidebar-width-collapsed: 3rem;
    --sidebar-width-icon: 3rem;
    --header-height: 3.5rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
${darkVars}
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
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

// Generate CSS for Tailwind 4
function generateCssVariablesV4(themeName: string): string {
  const theme = THEMES[themeName]
  if (!theme) return ""

  // Helper to convert HSL space-separated values to generic values if needed, 
  // but for now we trust the HSL values work with Tailwind 4's opacity modifiers if setup correctly.
  // We'll keep the variables as they are but ensure the @theme block maps them correctly.

  const lightVars = Object.entries(theme.light)
    .map(([key, value]) => `  --${key}: ${value};`) // Indentation 2 spaces
    .join("\n")

  const darkVars = Object.entries(theme.dark)
    .map(([key, value]) => `    --${key}: ${value};`) // Indentation 4 spaces
    .join("\n")

  // Generate theme mappings
  // Note: We use color-mix or just raw var usage depending on how strict we want to be.
  // shadcn usually provides strictly HSL values (e.g. "222.2 84% 4.9%") which need `hsl(var(--...))` wrapper in usage.
  // But Tailwind 4 can use variables directly if defined as colors.
  // The provided example uses: --color-background: var(--background);
  // And --background is defined as hex.
  // Our themes are HSL numbers. So we need `hsl(var(--...))` wrapper for Tailwind < 4 compatibility, 
  // OR we define properties that expect HSL.

  // WAIT: The user example for TW4 shows hex values for background/foreground.
  // Our THEMES have HSL space separated values (e.g. "0 0% 100%").
  // To make this compatible with the user's requesting format (using --color-* logic),
  // we need to wrap our HSL values in `hsl(...)` OR change the THEMES values.
  // Changing THEMES values breaks TW3 compatibility unless we act smart.
  // Better approach: Keep THEMES as HSL numbers. In CSS, define:
  // --background: hsl(0 0% 100%);

  // Let's adapt the output to look like the requested format but using our HSL values wrapped in hsl().

  const lightVarsHsl = Object.entries(theme.light)
    .map(([key, value]) => `  --${key}: hsl(${value});`)
    .join("\n")

  const darkVarsHsl = Object.entries(theme.dark)
    .map(([key, value]) => `    --${key}: hsl(${value});`)
    .join("\n")

  return `@import "tailwindcss";

:root {
${lightVarsHsl}
  --radius: 0.5rem;
  --sidebar-width: 16rem;
  --sidebar-width-mobile: 18rem;
  --sidebar-width-collapsed: 3rem;
  --sidebar-width-icon: 3rem;
  --header-height: 3.5rem;
  --sidebar-background: 0 0% 98%;
  --sidebar-foreground: 240 5.3% 26.1%;
  --sidebar-primary: 240 5.9% 10%;
  --sidebar-primary-foreground: 0 0% 98%;
  --sidebar-accent: 240 4.8% 95.9%;
  --sidebar-accent-foreground: 240 5.9% 10%;
  --sidebar-border: 220 13% 91%;
  --sidebar-ring: 217.2 91.2% 59.8%;
}

@theme inline {
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  --color-sidebar: var(--sidebar-background);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  
  /* Accordion Animations */
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;

  @keyframes accordion-down {
    from { height: 0; }
    to { height: var(--radix-accordion-content-height); }
  }
  @keyframes accordion-up {
    from { height: var(--radix-accordion-content-height); }
    to { height: 0; }
  }
}

@media (prefers-color-scheme: dark) {
  :root {
${darkVarsHsl}
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
`

export async function init(options: InitOptions) {
  const cwd = path.resolve(options.cwd)

  // Detect package manager
  const userAgent = process.env.npm_config_user_agent || ""
  const isYarn = userAgent.includes("yarn")
  const isPnpm = userAgent.includes("pnpm")
  const isBun = userAgent.includes("bun")
  const packageManager = isPnpm ? "pnpm" : isYarn ? "yarn" : isBun ? "bun" : "npm"
  const installCmd = isPnpm ? "add" : isYarn ? "add" : isBun ? "add" : "install"

  console.log(chalk.cyan("\n🚀 Initializing @srcroot/ui...\n"))

  // Check if this is a valid project
  const packageJsonPath = path.join(cwd, "package.json")
  if (!fs.existsSync(packageJsonPath)) {
    console.log(chalk.red("Error: No package.json found. Please run this in a project directory."))
    process.exit(1)
  }

  // Detect Tailwind Version
  const pkg = await fs.readJson(packageJsonPath)
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }
  const tailwindVersion = allDeps["tailwindcss"] || ""
  const isTailwind4 = tailwindVersion.includes("^4") || tailwindVersion.startsWith("4") || allDeps["@tailwindcss/postcss"]

  // Determine paths
  const hasSrc = fs.existsSync(path.join(cwd, "src"))
  const srcPath = hasSrc ? path.join(cwd, "src") : cwd

  // Detect Router Type
  const appPath = path.join(srcPath, "app")
  const pagesPath = path.join(srcPath, "pages")
  const hasAppDir = fs.existsSync(appPath)
  const hasPagesDir = fs.existsSync(pagesPath)

  // Adjust paths
  const libDir = path.join(srcPath, "lib")
  const componentsDir = path.join(srcPath, "components", "ui")

  // Find globals.css
  let globalsPath = ""

  if (hasAppDir) {
    // App Router: usually in app/globals.css
    if (fs.existsSync(path.join(appPath, "globals.css"))) {
      globalsPath = path.join(appPath, "globals.css")
    } else if (fs.existsSync(path.join(appPath, "global.css"))) {
      globalsPath = path.join(appPath, "global.css")
    } else {
      // Default to app/globals.css for new projects
      globalsPath = path.join(appPath, "globals.css")
    }
  } else if (hasPagesDir) {
    // Pages Router: usually in styles/globals.css
    const stylesPath = path.join(srcPath, "styles")
    if (fs.existsSync(path.join(stylesPath, "globals.css"))) {
      globalsPath = path.join(stylesPath, "globals.css")
    } else if (fs.existsSync(path.join(stylesPath, "global.css"))) {
      globalsPath = path.join(stylesPath, "global.css")
    } else {
      globalsPath = path.join(stylesPath, "globals.css")
    }
  } else {
    // Fallback: root/globals.css or src/globals.css
    globalsPath = path.join(srcPath, "globals.css")
  }

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

    const cssContent = isTailwind4
      ? generateCssVariablesV4(selectedTheme)
      : generateCssVariablesV3(selectedTheme)

    await fs.writeFile(globalsPath, cssContent)
    spinner.succeed(`Updated ${chalk.cyan(path.relative(cwd, globalsPath))} with ${chalk.cyan(THEMES[selectedTheme].name)} theme (${isTailwind4 ? "Tailwind 4" : "Tailwind 3"})`)

    // Create tailwind.config.ts (Only for Tailwind 3)
    if (!isTailwind4) {
      spinner.start("Setting up Tailwind config...")
      const tailwindConfigPath = path.join(cwd, "tailwind.config.ts")
      await fs.writeFile(tailwindConfigPath, TAILWIND_CONFIG)
      spinner.succeed(`Created ${chalk.cyan("tailwind.config.ts")}`)
    } else {
      spinner.info(`Tailwind 4 detected - skipping ${chalk.cyan("tailwind.config.ts")}`)
    }

    // Success message at the end
    console.log(chalk.green("\n✅ Project initialized successfully!\n"))
    console.log(`Theme: ${chalk.cyan(THEMES[selectedTheme].name)}`)
    console.log(`Tailwind: ${chalk.cyan(isTailwind4 ? "v4" : "v3")}`)

    // List required dependencies for manual installation
    const requiredDeps = [
      "clsx",
      "tailwind-merge",
      "class-variance-authority",
      "lucide-react"
    ]

    if (!isTailwind4) {
      requiredDeps.push("tailwindcss-animate")
    }

    console.log(chalk.cyan("\n📦 Required dependencies:"))
    console.log(chalk.dim(`  ${packageManager} ${installCmd} ${requiredDeps.join(" ")}`))

    console.log("\n✨ Next steps:")
    console.log(chalk.dim("  1. Install dependencies (command above)"))
    console.log(chalk.dim("  2. npx @srcroot/ui add button"))
    console.log(chalk.dim("  3. npx @srcroot/ui add --all"))
    console.log()

  } catch (error) {
    spinner.fail("Failed to initialize project")
    console.error(error)
    process.exit(1)
  }
}

