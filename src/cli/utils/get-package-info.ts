import path from "path"
import fs from "fs-extra"
import { fileURLToPath } from "url"
import type { PackageJson } from "type-fest"

export function getPackageInfo(): PackageJson {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    // Try finding package.json in expected locations
    // 1. Production/Dist: dist/index.js -> ../package.json
    // 2. Development: src/cli/utils/get-package-info.ts -> ../../../package.json

    const pathsToCheck = [
        path.resolve(__dirname, "..", "package.json"),
        path.resolve(__dirname, "..", "..", "..", "package.json")
    ]

    for (const pkgPath of pathsToCheck) {
        if (fs.existsSync(pkgPath)) {
            return fs.readJSONSync(pkgPath) as PackageJson
        }
    }

    // Fallback version if package.json cannot be found (shouldn't happen in valid install)
    return { version: "0.0.0" } as PackageJson
}
