export type NoteColor = "WHITE"|"RED"|"YELLOW"|"GREEN"|"BLUE"|"PURPLE";

export type Note = {
    id:number;
    title:string;
    content:string;
    color:NoteColor;
    createTime?:Date;
    lastUpdateTime?:Date;
    test?:number;
}
