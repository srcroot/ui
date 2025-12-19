import fs from "fs"
import path from "path"

export function getPackageManager(cwd?: string): "npm" | "yarn" | "pnpm" | "bun" {
    // First check npm_config_user_agent (set when running via package manager)
    const userAgent = process.env.npm_config_user_agent

    if (userAgent) {
        if (userAgent.startsWith("yarn")) return "yarn"
        if (userAgent.startsWith("pnpm")) return "pnpm"
        if (userAgent.startsWith("bun")) return "bun"
        if (userAgent.startsWith("npm")) return "npm"
    }

    // Fallback: detect from lockfiles in cwd
    const dir = cwd || process.cwd()

    if (fs.existsSync(path.join(dir, "bun.lockb"))) return "bun"
    if (fs.existsSync(path.join(dir, "pnpm-lock.yaml"))) return "pnpm"
    if (fs.existsSync(path.join(dir, "yarn.lock"))) return "yarn"
    if (fs.existsSync(path.join(dir, "package-lock.json"))) return "npm"

    return "npm"
}
