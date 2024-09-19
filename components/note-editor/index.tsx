import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import TitleInput from "./title-input";
import { useState } from "react";
import ColorPicker from "./color-picker";
import { Note, NoteColor } from "@/types/note";
import ContentInput from "./content-input";
import SaveButton from "./save-button";

interface NoteEditorProps{
    style?:StyleProp<ViewStyle>,
    editable?:boolean,
    note:Note|Omit<Note, "id">,
    setNote:(note:Note|Omit<Note, "id">)=>void
}

export default function NoteEditor({
    style,
    note,
    setNote,
    editable = true
}:NoteEditorProps){
    const handleSetTitle = (title:string)=>setNote({...note, title})
    const handleSetColor = (color:NoteColor)=>setNote({...note, color})
    const handleSetContent = (content:string)=>setNote({...note, content})

    return <View style={[styles.container, style]}>
        <TitleInput value={note.title} setValue={handleSetTitle} editable={editable}/>
        <ColorPicker value={note.color} setValue={handleSetColor} editable={editable}/>
        <ContentInput value={note.content} setValue={handleSetContent} editable={editable}/>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        gap:16,
        padding:16,
    }
})