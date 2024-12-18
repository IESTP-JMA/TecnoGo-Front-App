export const CREATE_PROFESSIONAL_CAREERS_TABLE = `
  CREATE TABLE IF NOT EXISTS professional_careers (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
  );
`

export const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    uuid TEXT PRIMARY KEY,
    first_names TEXT,
    last_names TEXT,
    email TEXT UNIQUE,
    phone_number TEXT,
    professional_career TEXT REFERENCES professional_careers (id),
    semester TEXT,
    birth_date TEXT,
    dni TEXT UNIQUE,
    url_image TEXT,
    blurhash TEXT
  );
`
