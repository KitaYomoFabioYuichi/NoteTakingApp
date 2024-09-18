import { Note } from "@/types/note";

let nextId = 0;
const notes:Note[] = [];

export const getAllNotes = async ()=>{
    await wait(1000);

    return notes;
}

export const getNote = async (id:number)=>{
    await wait(1000);

    const index = notes.findIndex(n=>n.id === id);
    if(index === -1) return undefined;
    return notes[index];
}

export const addNote = async (data:Omit<Note, "id">)=>{
    await wait(1000);

    notes.push({...data, id:nextId++});

    console.log(notes);
    
}

const wait = (seconds:number)=>{
    return new Promise(resolve=>setTimeout(resolve,seconds));
}