import Database from "better-sqlite3";
import config from "./config.json" with { type:"json" };

// MAIN
const DatabaseManager = {};

DatabaseManager.Init = async (client) => {
  DatabaseManager.Database = new Database(config.DATABASE_NAME);
  DatabaseManager.Database.pragma("foreign_keys = ON");
  DatabaseManager.Database.pragma("journal_mode = WAL")
  
  console.log("Database initialization complete.")
};

export default DatabaseManager;
