import { Note } from "@/types/note";
import { StyleSheet, TextInput, View } from "react-native";

type NoteEditorProps = {
    note:Omit<Note, "id">,
    setNote:(value:Omit<Note, "id">)=>void
}

export default function NoteEditor({
    note,
    setNote
}:NoteEditorProps){
    return <View style={styles.container}>
        <TextInput 
            value={note.content} 
            onChangeText={(content:string)=>{
                let newNote = {...note, content:content}
                setNote(newNote);
            }}
            editable
            multiline
        />
    </View>
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#ffffff"
    }
})