import path from "path"
import fs from "fs-extra"
import { fileURLToPath } from "url"

/**
 * Get the absolute path to the registry directory.
 * Works in both development (src/cli/...) and production (dist/...).
 */
export function getRegistryPath(): string {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    // Expected locations of the registry directory:
    // 1. Production (bundled): dist/index.js -> ../src/registry
    // 2. Development: src/cli/utils/get-registry-path.ts -> ../../registry

    const pathsToCheck = [
        path.resolve(__dirname, "..", "src", "registry"),       // Production case
        path.resolve(__dirname, "..", "..", "registry"),        // Development case
        path.resolve(process.cwd(), "src", "registry"),         // Fallback/CWD case
    ]

    for (const p of pathsToCheck) {
        if (fs.existsSync(p)) {
            return p
        }
    }

    // If we get here, something is wrong, but we'll return a best-guess
    // and let the caller handle the missing file error.
    return path.resolve(__dirname, "..", "src", "registry")
}
