import { ProjectInitializer, type InitOptions } from "../services/project-initializer.js"

export async function init(options: InitOptions) {
  const initializer = new ProjectInitializer(options)
  await initializer.run()
}
