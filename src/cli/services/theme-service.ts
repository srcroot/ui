import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export interface ThemeInfo {
  name: string
  description: string
  file: string
}

// Map theme filename to display name and description
const THEME_METADATA: Record<string, { name: string; description: string }> = {
  slate: { name: "Slate", description: "Cool gray with strong blue undertones (default)" },
  neutral: { name: "Neutral", description: "Pure gray, no undertones" },
  stone: { name: "Stone", description: "Warm gray with brown undertones" },
  zinc: { name: "Zinc", description: "Cool gray with subtle blue undertones" },
  gray: { name: "Gray", description: "True neutral gray" },
}

export class ThemeService {
  private registryThemesPath: string

  constructor() {
    this.registryThemesPath = path.resolve(__dirname, "..", "src", "registry", "themes")
  }

  /**
   * Get list of available themes from registry/themes/v3/*.css (v3 as primary source)
   */
  public getAvailableThemes(): ThemeInfo[] {
    const themes: ThemeInfo[] = []
    const v3Path = path.join(this.registryThemesPath, "v3")

    if (!fs.existsSync(v3Path)) {
      return themes
    }

    const files = fs.readdirSync(v3Path)

    for (const file of files) {
      if (file.endsWith(".css")) {
        const themeName = file.replace(".css", "")
        const metadata = THEME_METADATA[themeName] || {
          name: themeName.charAt(0).toUpperCase() + themeName.slice(1),
          description: `${themeName} theme`,
        }

        themes.push({
          name: metadata.name,
          description: metadata.description,
          file: file,
        })
      }
    }

    return themes
  }

  /**
   * Get the complete CSS content for a theme from the appropriate v3 or v4 folder
   */
  public async getThemeCss(themeName: string, isTailwind4: boolean): Promise<string> {
    const versionFolder = isTailwind4 ? "v4" : "v3"
    const themeFilePath = path.join(this.registryThemesPath, versionFolder, `${themeName}.css`)

    if (!fs.existsSync(themeFilePath)) {
      throw new Error(`Theme file not found: ${themeFilePath}`)
    }

    const content = await fs.readFile(themeFilePath, "utf-8")
    return content
  }
}
