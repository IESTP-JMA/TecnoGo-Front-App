import { SQLiteDatabase } from "expo-sqlite";

export const createModuleDay = async (db, day, activity) => {
  const result = await db.runAsync(
    "INSERT INTO module_days (day, activity) VALUES (?, ?)",
    [day, activity]
  );
  return result.lastInsertRowId;
};

export const getFirstModuleDay = async (db) => {
  return await db.getFirstAsync("SELECT * FROM module_days LIMIT 1");
};

export const getAllModuleDays = async (db) => {
  return await db.getAllAsync("SELECT * FROM module_days");
};

export const getModuleDaysByDay = async (db, day) => {
  return await db.getAllAsync("SELECT * FROM module_days WHERE day = ?", [day]);
};

export const updateModuleDay = async (db, moduleId, day, activity) => {
  await db.runAsync(
    "UPDATE module_days SET day = ?, activity = ? WHERE module_id = ?",
    [day, activity, moduleId]
  );
};

export const deleteModuleDay = async (db, moduleId) => {
  await db.runAsync("DELETE FROM module_days WHERE module_id = ?", [moduleId]);
};
