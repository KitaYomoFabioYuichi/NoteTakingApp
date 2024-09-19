import { Note } from "@/types/note";

let nextId = 0;
const notes:Note[] = [];

const waitTime = 0;

export const getAllNotes = async ()=>{
    await wait(waitTime);

    return notes;
}

export const getNote = async (id:number)=>{
    await wait(waitTime);

    const index = notes.findIndex(n=>n.id === id);
    if(index === -1) return undefined;
    return notes[index];
}

export const addNote = async (data:Omit<Note, "id">)=>{
    await wait(waitTime);

    notes.push({...data, id:nextId++});
    
}

export const removeNote = async (id:number)=>{
    await wait(waitTime);

    const index = notes.findIndex(n=>n.id === id);
    notes.splice(index, 1);
}

export const removeMultiple = async (ids:number[])=>{
    await wait(waitTime);

    ids.forEach(id=>{
        const index = notes.findIndex(n=>n.id === id);
        notes.splice(index, 1);
    })
}

const wait = (seconds:number)=>{
    return new Promise(resolve=>setTimeout(resolve,seconds));
}