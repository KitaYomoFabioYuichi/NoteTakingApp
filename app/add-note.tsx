import { addNote } from '@/api/note-api';
import EditHeader from '@/components/edit-header';
import NoteEditor from '@/components/note-editor';
import { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

export default function AddNoteScreen() {
	const [note, setNote] = useState<Omit<Note, "id">>({
		title:"",
		content:"",
		color:"WHITE"
	});


	const queryClient = useQueryClient();
	const { mutateAsync, error, isPending } = useMutation({
		mutationFn:addNote,
		onSuccess:()=>{
			queryClient.invalidateQueries({queryKey:["notes"]});
			console.log("Added note!", note);
			router.navigate("/")
		}
	})

	const handleSave = ()=>{
		if(!isNoteValid(note)) return;
		mutateAsync({...note, createTime:new Date(), lastUpdateTime:new Date()});
	}

	const isNoteValid = (note:Omit<Note, "id">)=>{
		return Boolean(note.title) && Boolean(note.color);
	}

	return (
		<View style={styles.container}>
			<Stack.Screen 
				options={{
					title:"New Note",
					header:props=><EditHeader  
						onSavePress={handleSave} 
						disabled={!isNoteValid(note)} 
						{...props} 
					/>
				}}
			/>
			<NoteEditor note={note} setNote={setNote} editable={!isPending}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:"#FFFFFF"
	}
});