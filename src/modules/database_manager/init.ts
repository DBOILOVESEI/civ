import Database from "better-sqlite3";
import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url"; 
import config from "./config.json" with { type:"json" };

// MAIN
const DatabaseManager = {};

DatabaseManager.Init = async (client) => {
  const dbPath = join(import.meta.dirname, config.DATABASE_PATH, config.DATABASE_NAME);
  DatabaseManager.Database = new Database(dbPath);
  DatabaseManager.Database.pragma("foreign_keys = ON");
  DatabaseManager.Database.pragma("journal_mode = WAL")
  
  console.log("Database initialization complete.")
  
  const tablesPath = join(import.meta.dirname, config.TABLES_PATH);
  const tables = readdirSync(tablesPath);
  for (const tableModule of tables) {
    const moduleURL = pathToFileURL(join(tablesPath, tableModule, config.INIT_FILE)).href;
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

      console.log(funcName)
    };
  };

};

export default DatabaseManager;
