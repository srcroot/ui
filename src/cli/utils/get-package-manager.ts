import fs from "fs"
import path from "path"

export function getPackageManager(cwd?: string): "npm" | "yarn" | "pnpm" | "bun" {
    const dir = cwd || process.cwd()

    // Priority: detect from lockfiles first (most reliable)
    if (fs.existsSync(path.join(dir, "bun.lockb"))) return "bun"
    if (fs.existsSync(path.join(dir, "pnpm-lock.yaml"))) return "pnpm"
    if (fs.existsSync(path.join(dir, "yarn.lock"))) return "yarn"
    if (fs.existsSync(path.join(dir, "package-lock.json"))) return "npm"

    // Fallback: check npm_config_user_agent (when no lockfile exists)
    const userAgent = process.env.npm_config_user_agent
    if (userAgent) {
        if (userAgent.startsWith("yarn")) return "yarn"
        if (userAgent.startsWith("pnpm")) return "pnpm"
        if (userAgent.startsWith("bun")) return "bun"
    }

    return "npm"
}
