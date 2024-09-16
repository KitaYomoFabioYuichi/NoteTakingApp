import { DB } from "./db";

const db = new DB("db.db");

db.createTable("tb_notes", [
    {name:"content", type:"TEXT", notNull:true},
    {name:"createTime", type:"DATETIME"},
    {name:"lastUpdateTime", type:"DATETIME"}
]);

export default db;