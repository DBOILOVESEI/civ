import { readdirSync } from "fs"
import { join } from "path"
import { pathToFileURL } from "url"
import config from "./config.json" with { type: "json" }

const ModulesLoader = {}

ModulesLoader.Init = async(client) => {
  const modules_path = join(import.meta.dirname, config.MODULES_PATH);
  const modules = readdirSync(modules_path);

  for (const moduleName of modules) {
    if (config.TO_LOAD.includes(moduleName) == false) { continue; };
    
    const moduleURL = pathToFileURL(join(modules_path, moduleName, config.INIT_FILE)).href;
    
    const moduleNamespace = await import(moduleURL);
    const md = moduleNamespace.default;
    
    if (md && typeof md.Init === "function") {
      await md.Init(client);
    } else {
      console.error(`Module at ${moduleURL} is missing an Init function!`);
    }
  };
}

export default ModulesLoader
