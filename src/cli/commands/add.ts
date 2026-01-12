import path from "path"
import { ComponentAdder } from "../services/component-adder.js"

interface AddOptions {
    overwrite: boolean
    all: boolean
    cwd: string
}

export async function add(components: string[], options: AddOptions) {
    const cwd = path.resolve(options.cwd)
    const adder = new ComponentAdder(cwd, options)
    await adder.add(components)
}
