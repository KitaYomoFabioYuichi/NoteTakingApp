import { Note } from "@/types/note";
import * as SQLite from 'expo-sqlite';

const DB_NAME = "db.db";

const db = initDatabase();

function initDatabase(){
    const db = SQLite.openDatabaseSync(DB_NAME);
    db.withTransactionSync(()=>{
        db.runSync(
            `CREATE TABLE IF NOT EXISTS tb_notes(
                id  INTEGER PRIMARY KEY,
                content string not null,
                created_date datetime,
                last_updated_date datetime
            );`
        );
    })
    return db;
}

export async function addNote(noteData:Omit<Note, "id">){
    await db.withTransactionAsync(async ()=>{
        await db.runAsync(`
            INSERT INTO tb_notes(
                content, 
                created_date, 
                last_updated_date
            ) VALUES("${noteData.content}", "${noteData.createTime}", "${noteData.lastUpdateTime}");
        `)
    })
}

export async function removeNote(id:number){
    await db.withTransactionAsync(async ()=>{
        await db.runAsync(`
            DELETE FROM tb_notes WHERE id = ${id}
        `)
    })
}

export async function getNote(id:number){
    const result = await db.getFirstAsync(`SELECT * FROM tb_notes WHERE id = ?`, id);
    console.log(result);
    return result as Note;
}

export async function getNotes(){
    const result = await db.getAllAsync("SELECT * FROM tb_notes");
    console.log(result);
    return result as Note[];
}

export async function setNote(id:number, noteData:Omit<Note, "id">){
    await db.withTransactionAsync(async ()=>{
        await db.runAsync(`
            UPDATE tb_notes 
            SET content="${noteData.content}", last_updated_date="${noteData.lastUpdateTime}" 
            WHERE id = ${id}
        `)
    })
}

/*
let nextId = 0;
const notes:Note[] = [];

for(let i = 0; i < 100; i++){
    notes.push({
        id:nextId++,
        content:"Note Hello" + i,
    })
}

function wait(seconds:number){
    return new Promise(resolve=>setTimeout(resolve, seconds))
}

function getNoteIndex(id:number){
    return notes.findIndex(n=>n.id===id);
}

export async function addNote(noteData:Omit<Note, "id">){
    await wait(1000);
    let noteToAdd = {...noteData, id:nextId++};
    notes.push(noteToAdd);
}

export async function removeNote(id:number){
    await wait(1000);

    let index = getNoteIndex(id);
    if(index === -1) return;

    notes.splice(index, 1);
}

export async function getNote(id:number){
    await wait(1000);

    let index = getNoteIndex(id);
    if(index === -1) return undefined;

    return notes[index];
}

export async function getNotes(){
    await wait(1000);
    return notes;
}

export async function setNote(id:number, noteData:Omit<Note, "id">){
    let index = getNoteIndex(id);
    if(index === -1) return undefined;

    let newNote = {...notes[index], ...noteData, id:id};

    notes[index] = newNote;
}

*/