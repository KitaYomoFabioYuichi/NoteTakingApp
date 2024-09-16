import { noteTable } from "@/api";
import NoteEditor from "@/components/notes/note-editor";
import { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddNoteScreen(){
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn:(data:Omit<Note, "id">)=>noteTable.add(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["notes"]}),
            router.navigate("/note-list")
        },
        onError:(error)=>{
            console.log(error);
        }
    })

    const [newNote, setNewNote] = useState<Omit<Note, "id">>({ content:"" });

    return <View style={styles.container}>
        <Pressable onPress={()=>{
            Keyboard.dismiss();
            mutate({...newNote, createTime:new Date(), lastUpdateTime:new Date()});
        }}>
            <Text>
                Add Note
            </Text>
        </Pressable>
        <NoteEditor note={newNote} setNote={setNewNote}/>
    </View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        padding:50
	}
});