import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import ColorPicker from "@/components/inputs/color-picker";
import { Note, NoteColor } from "@/types/note";
import LimitTextInputMultiline from "../inputs/limit-text-input-multiline";
import LimitTextInput from "../inputs/limit-text-input";

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
        <LimitTextInput 
            maxLength={50} 
            value={note.title} 
            setValue={handleSetTitle} 
            editable={editable}
            placeholder="Title"
            textInputStyle={styles.titleInput}
        />
        <ColorPicker 
            value={note.color} 
            setValue={handleSetColor} 
            editable={editable}
        />
        <LimitTextInputMultiline 
            maxLength={2000} 
            value={note.content} 
            setValue={handleSetContent} 
            editable={editable}
            placeholder="Description"
        />
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        gap:16,
        padding:16,
    },
    titleInput:{
        fontSize:20,
        fontWeight:"bold"
    }
})