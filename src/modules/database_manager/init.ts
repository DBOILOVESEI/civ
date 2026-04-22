import Database from "better-sqlite3";
import { readdirSync, unlinkSync, existsSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url"; 

import globalConfig from "../../../config.json" with { type:"json" };
import config from "./config.json" with { type:"json" };

// MAIN
const DatabaseManager = {};

DatabaseManager.Init = async (client) => {
  const dbPath = join(import.meta.dirname, config.DATABASE_PATH, config.DATABASE_NAME);
  
  if (globalConfig.DROP_DATABASE === true ) {
    try {
      unlinkSync(dbPath);
      console.log("[NOTICE] Deleted database successfully. If this was done by mistake, please change the project's config file.");
    } catch (err) {
      console.log("[ERROR] Error trying to drop database: ", err);
    };
  };

  DatabaseManager.Database = new Database(dbPath);
  DatabaseManager.Database.pragma("foreign_keys = ON");
  DatabaseManager.Database.pragma("journal_mode = WAL")
  
  const tablesPath = join(import.meta.dirname, config.TABLES_PATH);
  const tables = readdirSync(tablesPath);
  for (const tableModule of tables) {
    const modulePath = join(tablesPath, tableModule, config.INIT_FILE);
    const moduleURL = pathToFileURL(modulePath).href;

    if (existsSync(modulePath) === false) { continue; };

    const table = (await import(moduleURL)).default;

    if (!("Init" in table)) {
      console.log(`TableModule ${tableModule} in ${tablesPath} is missing Init function.`)
      return;
    };

    table.Init(client, DatabaseManager.Database);

    for (const funcName in table) {
      if (config.INDEX_FUNCTION_IGNORE.includes(funcName)) {continue;};
      
      const func = table[funcName];
      if (!(typeof func === "function")) { continue; };

      const existingFunc = DatabaseManager[funcName];
      if (existingFunc) {
        console.log(`Function ${funcName} already exists in DatabaseManager.`);
        continue;
      }

      DatabaseManager[funcName] = table[funcName];
    };
  };

};

export default DatabaseManager;
