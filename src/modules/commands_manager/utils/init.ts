import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import config from "../config.json" with { type:"json" };

// MAIN
const Utils = {};

Utils.Init = async (client) => {
  const modulesPath = join(import.meta.dirname, config.MODULES_PATH);
  const modules = readdirSync(modulesPath);

  for (const utilModuleName of modules) {
    const moduleURL = pathToFileURL(join(modulesPath, utilModuleName)).href;
    const utilModule = (await import(moduleURL)).default;

    for (const funcName in utilModule) {
      if (Utils[funcName]) { continue; };

      Utils[funcName] = utilModule[funcName];
    }
  };
};

export default Utils;
