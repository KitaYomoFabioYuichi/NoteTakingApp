import { getNote, setNote } from "@/api/note-api";
import NoteEditor from "@/components/notes/note-editor";
import { Note } from "@/types/note";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";

export default function EditNoteScreen(){
    const { id } = useLocalSearchParams();
    const idAsNumber = parseInt(id.toString());

    const queryClient = useQueryClient();

    const { data, error, isSuccess, isLoading, isError } = useQuery({
        queryFn: ()=>getNote(idAsNumber),
        queryKey:["notes", idAsNumber]
    })

    const { mutate } = useMutation({
        mutationFn: (noteData:Omit<Note, "id">)=>setNote(idAsNumber, noteData),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["notes", idAsNumber]});
            router.navigate("/note-list");
        }
    })

    useEffect(()=>{
        if(isSuccess && data){
            setNewNote(data);
        }
    },[data, isSuccess])

    const [newNote, setNewNote] = useState<Omit<Note, "id">>({ content:"" });

    return <View style={styles.container}>
        {isLoading&&<Text>Loading...</Text>}
        {isError&&<Text>{"Error" + error.message}</Text>}
        {isSuccess&&<>
            <Pressable onPress={()=>{
                Keyboard.dismiss();
                mutate({...newNote, lastUpdateTime:new Date()});
            }}>
                <Text>
                    Add Note
                </Text>
            </Pressable>
            <NoteEditor note={newNote} setNote={setNewNote}/>
        </>}
    </View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        padding:50
	}
});