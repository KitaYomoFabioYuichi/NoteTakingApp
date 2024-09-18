
import { Note } from '@/types/note';
import { DB } from './db';

const db = new DB("db.db");

export const noteTable = db.createTable<Note>("tb_notes", [
    {name:"content", type:"TEXT", notNull:true},
    {name:"createTime", type:"DATETIME"},
    {name:"lastUpdateTime", type:"DATETIME"}
]);