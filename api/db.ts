import * as SQLite from 'expo-sqlite';

const initDb = (dbName:string)=>{
    const db = SQLite.openDatabaseSync(dbName);

    return db;
}

export const db = initDb("db.db");

