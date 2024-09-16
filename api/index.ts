import { DB } from "./db";
import { Note } from '@/types/note';

const db = new DB("db.db");

export const noteTable = db.createTable<Note>("tb_notes", [
    {name:"content", type:"TEXT", notNull:true},
    {name:"createTime", type:"DATETIME"},
    {name:"lastUpdateTime", type:"DATETIME"},
    {name:"test", type:'NUMERIC'}
]);