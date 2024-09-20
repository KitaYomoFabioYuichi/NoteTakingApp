import { editNote as setNote, getNote } from "@/api/note-api";
import EditHeader from "@/components/edit-header";
import NoteEditor from "@/components/note-editor";
import { Note } from "@/types/note";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function EditNoteScreen(){
    const id = useHandleGetId();

    const [note, setNote] = useState<Omit<Note, "id">>({
		title:"",
		content:"",
		color:"WHITE"
	});

    const {fetchLoading, fetchError} = useFetchNote(id, setNote);
    const {handleSave, isNoteValid, mutateLoading, mutateError} = useMutateNote(id, note);
    const loading = fetchLoading || mutateLoading;

    return <View style={styles.container}>
        <Stack.Screen 
            options={{
                title:"Edit Note",
                header:props=><EditHeader  
                    onSavePress={handleSave} 
                    disabled={!isNoteValid(note)} 
                    {...props} 
                />
            }}
        />
        <NoteEditor note={note} setNote={setNote} editable={!loading}/>
    </View>
}

function useFetchNote(id:number, onFetchSuccess = (note:Note)=>{}){
    const {data, isLoading, error} = useQuery({
        queryKey:["_"],
        queryFn:async ()=> await getNote(id)
    });

    useEffect(()=>{
        if(data) onFetchSuccess(data);
    },[data])

    return {fetchLoading:isLoading, fetchError:error}
}

function useMutateNote(id:number, data:Omit<Note, "id">){
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn:(note:Omit<Note, "id">)=>setNote(id, note),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["notes"]});
            router.back();
        }
    })

    const isNoteValid = (note:Omit<Note, "id">)=>{
		return Boolean(note.title) && Boolean(note.color);
	}

    const handleSave = ()=>{
		if(!isNoteValid(data)) return;
		mutateAsync(data);
	}

    return {handleSave, isNoteValid, mutateLoading:isPending, mutateError:error}
}

function useHandleGetId(){
    const { id } = useLocalSearchParams();
    return parseInt(id as string);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:"#FFFFFF"
	}
});