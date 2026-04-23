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

    DatabaseManager.SetUpTableModule(table, DatabaseManager.Database);

    if ("Init" in table) {
      table.Init(client, DatabaseManager.Database);
    };

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

DatabaseManager.SetUpTableModule = (table, database) => {
  table.Database = database;

  for (const queryName in table.Queries) {
    const query = table.Queries[queryName];

    // Creating Table uses exec()
    if (queryName.includes("Table")) {
      table.Database.exec(query);
      continue;
    };

    const statement = table.Database.prepare(query);
    table.Statements[queryName] = statement; 

    // Get uses SELECT, which needs to use all()
    if (queryName.includes("Get")) {
      table[queryName] = (args: {[key: string]: any} | null) => {
        return args ? statement.all(args) : statement.all();
      };
      continue;
    };

    // The rest of the commands use run()
    table[queryName] = (args: {[key: string]: any} | null) => {
      return args ? statement.run(args) : statement.run();
    };
  };
};

export default DatabaseManager;
