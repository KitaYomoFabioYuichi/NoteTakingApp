import { db } from "./db";
import { Note } from "@/types/note";

db.withTransactionSync(()=>{
    db.execSync(`CREATE TABLE IF NOT EXISTS tb_notes(
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        color TEXT NOT NULL,
        createTime DATETIME,
        lastUpdateTime DATETIME
    )`)
})

export const getAllNotes = async ()=>{
    const query = `SELECT * FROM tb_notes`;
    console.log(query);
    return await db.getAllAsync(query) as Note[]
}

export const getNote = async (id:number)=>{
    const query = `SELECT * FROM tb_notes WHERE id='${id}'`;
    console.log(query);
    return await db.getFirstAsync(query) as Note
}

export const addNote = async (data:Omit<Note, "id">)=>{
    const query = `INSERT INTO tb_notes(title, content, color, createTime, lastUpdateTime) VALUES('${data.title}', '${data.content}', '${data.color}', '${data.createTime}', '${data.lastUpdateTime}')`;
    console.log(query);
    await db.withTransactionAsync(async ()=>db.execAsync(query))
}

export const removeAllNotes = async (ids:number[])=>{
    const query = `DELETE FROM tb_notes WHERE id in (${ids})`;
    console.log(query);
    await db.withTransactionAsync(async ()=>db.execAsync(query))
}

export const editNote = async (id:number, data:Omit<Note, "id">)=>{
    const query = `UPDATE tb_notes SET title='${data.title}', content='${data.content}', color='${data.color}', lastUpdateTime='${data.lastUpdateTime}' WHERE id=${id} `;
    console.log(query);
    await db.withTransactionAsync(async ()=>db.execAsync(query))
}