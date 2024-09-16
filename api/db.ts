import * as SQLite from 'expo-sqlite';

type ColumnType = "TEXT"|"NUMERIC"|"BOOLEAN"|"DATETIME";

type ColumnData = {
    name:string,
    type:ColumnType,
    notNull?:boolean
}

class Column{
    name:string;
    type:ColumnType;
    notNull:boolean;

    constructor(name:string, type:ColumnType, notNull:boolean = false){
        this.name = name;
        this.type = type;
        this.notNull = notNull;
    }

    toCreateTableParameter(){
        return `${this.name} ${this.type} ${this.notNull?"NOT NULL":""}`
    }
}

class Table<T extends {[key:string]:any}> {
    db:DB;
    name:string;
    columns:Column[];

    constructor(db:DB, name:string, columns:ColumnData[]){
        this.db = db;
        this.name = name;
        this.columns = columns.map(c=> new Column(c.name, c.type, c.notNull));

        this.create();
    }

    private create(){
        const db:SQLite.SQLiteDatabase = this.db.db;
        console.log(this.toCreateString());
        db.withTransactionSync(()=>db.execSync(this.toCreateString()));
    }

    private toCreateString(){
        return `CREATE TABLE IF NOT EXISTS ${this.name} (
            id INTEGER PRIMARY KEY,
            ${this.columns.map(c=>c.toCreateTableParameter())}
        );`;
    }

    async get(id:number){
        const db:SQLite.SQLiteDatabase = this.db.db;
        return await db.getFirstAsync(`SELECT * FROM ${this.name} WHERE id=${id}`) as T;
    }

    async getAll(){
        const db:SQLite.SQLiteDatabase = this.db.db;
        return await db.getAllAsync(`SELECT * FROM ${this.name}`) as T[];
    }

    async add(data:Omit<T, "id">){
        const keys = this.getKeysIfExistsInsideColumns(data);
        const setQueryParams = keys.map(k=>`"${data[k]}"`);

        const query = `INSERT INTO tb_notes(${keys}) VALUES(${setQueryParams});`;
        console.log(query);

        const db:SQLite.SQLiteDatabase = this.db.db;
        await db.withTransactionAsync(async ()=>{
            await db.runAsync(query)
        })
    }

    async remove(id:number){
        const db:SQLite.SQLiteDatabase = this.db.db;
        return await db.withTransactionAsync(async ()=>{
            await db.execAsync(`DELETE FROM ${this.name} WHERE id = ${id}`)
        })
    }

    async set(id:number, data:Omit<T, "id">){
        const keys = this.getKeysIfExistsInsideColumns(data);
        const setQueryParams = keys.map(k=>`${k}="${data[k]}"`);

        const query = `UPDATE tb_notes SET ${setQueryParams} WHERE id = ${id};`;
        console.log(query);

        const db:SQLite.SQLiteDatabase = this.db.db;
        await db.withTransactionAsync(async ()=>{
            await db.runAsync(query)
        })
    }

    private getKeysIfExistsInsideColumns(data:Omit<T, "id">){
        const dataKeys = Object.keys(data);
        const columnsProps = this.columns.map(c=>c.name);
        return dataKeys.filter(k=>columnsProps.includes(k));
    }
}

export class DB{
    db:SQLite.SQLiteDatabase;
    name:string;
    tables:{[key:string]:Table<any>}

    constructor(name:string){
        this.name = name;
        this.db = SQLite.openDatabaseSync(name);
        this.tables = {};
    }

    createTable<T extends {}>(name:string, columns:ColumnData[]){
        let newTable = new Table<T>(this, name, columns);
        this.tables[name] = newTable;
    }

    getTable<T extends {}>(name:string){
        return this.tables[name] as Table<T>;
    }

    close(){
        this.db.closeSync();
        SQLite.deleteDatabaseSync(this.name);
    }
}
