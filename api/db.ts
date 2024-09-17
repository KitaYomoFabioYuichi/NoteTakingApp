import * as SQLite from 'expo-sqlite';

type ColumnType = "TEXT"|"NUMERIC"|"DATETIME"|"BOOLEAN";

type ColumnData = {
    name:string,
    type:ColumnType,
    notNull?:boolean
}

type KeyValue = { [key:string]:any }

abstract class Column{
    name:string;
    notNull:boolean;

    constructor(name:string, notNull:boolean = false){
        this.name = name;
        this.notNull = notNull;
    }

    abstract toCreateTableParameter():string;

    dbValueToValue = (realValue:any):any=>realValue;

    valueToDbValue = (value:any):any=>value;
}

class TextColumn extends Column{
    toCreateTableParameter(): string {
        return `${this.name} TEXT` + (this.notNull?" NOT NULL":"");
    }
}

class NumericColumn extends Column{
    toCreateTableParameter(): string {
        return `${this.name} NUMBER` + (this.notNull?" NOT NULL":"");
    }
}

class DateTimeColumn extends Column{
    toCreateTableParameter(): string {
        return `${this.name} DATETIME` + (this.notNull?" NOT NULL":"");
    }
}

class PrimaryColumn extends Column{
    toCreateTableParameter(): string {
        return `${this.name} INTEGER PRIMARY KEY` + (this.notNull?" NOT NULL":""); 
    }
}

class BooleanColumn extends Column{
    toCreateTableParameter(): string {
        throw new Error('Method not implemented.');
    }

    dbValueToValue = (realValue: any)=>{
        throw new Error("not implemented");
    }

    valueToDbValue = (value:any):any=>{
        throw new Error("not implemented");
    }
}

class Table<T extends KeyValue>{
    db:DB;
    name:string;
    columns:Column[];

    constructor(db:DB, name:string, columns:ColumnData[]){
        this.db = db;
        this.name = name;
        
        this.columns = [];

        this.columns.push(new PrimaryColumn("id"));
        columns.forEach(c=>{
            switch(c.type){
                case 'TEXT':this.columns.push(new TextColumn(c.name, c.notNull));break;
                case 'NUMERIC':this.columns.push(new NumericColumn(c.name, c.notNull));break;
                case 'DATETIME':this.columns.push(new DateTimeColumn(c.name, c.notNull));break;
            }
        })

        this.create();
    }

    private create = ()=>{
        const db:SQLite.SQLiteDatabase = this.db.db;
        db.withTransactionSync(()=>{
            db.execSync(`CREATE TABLE IF NOT EXISTS ${this.name}(${this.columns.map(c=>c.toCreateTableParameter())});`)
        });
    }

    get = async(id:number)=>{
        const db:SQLite.SQLiteDatabase = this.db.db;
        const query = `SELECT * FROM ${this.name} WHERE id=${id}`;

        console.log(query);
        

        const dbResult = await db.getFirstAsync(query) as KeyValue;
        return this.parseDbDataToData(dbResult);
    }

    getAll = async()=>{
        const db:SQLite.SQLiteDatabase = this.db.db;
        const query = `SELECT * FROM ${this.name}`;

        console.log(query);
        

        const dbResult = await db.getAllAsync(query) as KeyValue[];
        return dbResult.map(dbr=>this.parseDbDataToData(dbr));
    }

    add = async(data:Omit<T, "id">)=>{
        const dbData = this.parseDataToDbData({...data});

        const db:SQLite.SQLiteDatabase = this.db.db;

        const props = Object.keys(dbData).join(", ");
        const values = Object.values(dbData).map(v=>`"${v}"`).join(", ");
        const query = `INSERT INTO ${this.name}(${props}) VALUES(${values})`;

        console.log(query);

        await db.withTransactionAsync(async ()=>await db.execAsync(query));
    }

    remove = async (id:number)=>{
        const db:SQLite.SQLiteDatabase = this.db.db;
        const query = `DELETE FROM ${this.name} WHERE id=${id}`;
        console.log(query);

        await db.withTransactionAsync(async ()=>await db.execAsync(query));
    }

    set = async (id:number, data:Omit<T, "id">)=>{
        const dbData = this.parseDataToDbData(data);
        delete dbData["id"];

        const props = Object.entries(dbData).map(([key, value])=>`${key}="${value}"`).join(", ")
        const db:SQLite.SQLiteDatabase = this.db.db;
        const query = `UPDATE ${this.name} SET ${props} WHERE id=${id}`;

        console.log(query);
        
        await db.withTransactionAsync(async ()=>await db.execAsync(query));
    }

    private parseDbDataToData = (dbData:KeyValue):T=>{
        let result:KeyValue = {};

        this.columns.forEach(c=>{
            if(Object.hasOwn(dbData, c.name))
                result[c.name] = c.dbValueToValue(dbData[c.name]);
        })

        return result as T;
    }

    private parseDataToDbData = (data:T|Omit<T, "id">):KeyValue=>{
        let result:KeyValue = {};

        this.columns.forEach(c=>{
            if(Object.hasOwn(data, c.name)) 
                result[c.name] = c.valueToDbValue(data[c.name]);
        })

        return result;
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

    createTable = <T extends KeyValue>(name:string, columns:ColumnData[])=>{
        let newTable = new Table<T>(this, name, columns);
        this.tables[name] = newTable;
        return newTable;
    }

    getTable = <T extends KeyValue>(name:string)=>{
        return this.tables[name] as Table<T>;
    }

    close = ()=>{
        this.db.closeSync();
        SQLite.deleteDatabaseSync(this.name);
    }
}