import { Note } from "@/types/note";
import db from "./api";

const t = db.getTable<Note>("tb_notes");

export async function addNote(noteData:Omit<Note, "id">){
    await t.add(noteData);
}

export async function removeNote(id:number){
    await t.remove(id);
}

export async function getNote(id:number){
    return await t.get(id);
}

export async function getNotes(){
    const result = await t.getAll();
    console.log(result);
    return result;
}

export async function setNote(id:number, noteData:Omit<Note, "id">){
    await t.set(id, noteData);
}