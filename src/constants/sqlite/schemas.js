export const DATABASE_NAME = "app.db";

export const SCHEMAS = {
  USERS: `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  MODULE_DAYS: `
    CREATE TABLE IF NOT EXISTS module_days (
      module_id INTEGER PRIMARY KEY AUTOINCREMENT,
      day TEXT NOT NULL,
      activity TEXT
    )
  `,
};
