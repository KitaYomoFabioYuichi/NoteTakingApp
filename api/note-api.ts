import { Note, NoteColor } from "@/types/note";

let nextId = 3;
const notes:Note[] = [
    {id:0, title:"Note 1", content:"A small note", color:"BLUE"},
    {id:1, title:"Note 2", content:"Also a small note", color:"WHITE"},
    {id:2, title:"Lorem Ipsum", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ligula ipsum, convallis ut congue ac, pellentesque sed enim. Sed feugiat mi tortor, nec volutpat lorem aliquet non. Praesent semper et odio at facilisis. Quisque convallis turpis eu pretium pulvinar. Vivamus quis dui ipsum.", color:"RED"}
];

const waitTime = 0;

type Filter = {
    searchText:string,
    searchColor:NoteColor|""
}

export const getAllNotes = async (filter:Filter = {searchText:"", searchColor:""})=>{
    await wait(waitTime);

    return notes.filter(n=>{
        if(n.title.includes(filter.searchText)) return true;
        else if(n.content.includes(filter.searchText)) return true;
        else if(n.color.includes(filter.searchColor)) return true;
        else return false;
    })
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

export const editNote = async (id:number, data:Omit<Note, "id">)=>{
    await wait(waitTime);

    const index = notes.findIndex(n=>n.id === id);
    if(index === -1) return;
    notes[index] = {...notes[index], ...data};
}

const wait = (seconds:number)=>{
    return new Promise(resolve=>setTimeout(resolve,seconds));
}