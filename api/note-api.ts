import { Note } from "@/types/note";

let nextId = 0;
const notes:Note[] = [];

for(let i = 0; i < 100; i++){
    notes.push({
        id:nextId++,
        content:"Note Hello" + i,
    })
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

function wait(seconds:number){
    return new Promise(resolve=>setTimeout(resolve, seconds))
}

function getNoteIndex(id:number){
    return notes.findIndex(n=>n.id===id);
}