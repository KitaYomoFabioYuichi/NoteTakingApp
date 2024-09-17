import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Note } from '@/types/note';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { noteTable } from '@/api';

export default function NoteListScreen() {
	const queryClient = useQueryClient();

	const {data, isLoading, error} = useQuery({
		queryFn:noteTable.getAll,
		queryKey:["notes"],
	});

	const { mutate } = useMutation({
		mutationFn:noteTable.remove,
		onSuccess:()=>{
			console.log("Hello");
			queryClient.invalidateQueries({ queryKey:["notes"] })
		}
	})
	
	return (
		<View style={styles.container}>
			<ScrollView>
				<Text>Notes</Text>
				<Link href={"/add-note"}>Add Note</Link>
				{isLoading&&<Text>Loading...</Text>}
				{error&&<Text>{"Error" + error.message}</Text>}
				{data&&data.map(n=><NoteEntry key={n.id} note={n} handleDelete={()=>mutate(n.id)}/>)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap:10
	},
});


type NoteEntryProps = {
	note:Note,
	handleDelete:()=>void
}

function NoteEntry({
	note,
	handleDelete
}:NoteEntryProps){
	const handleDeletePress = ()=>{
		Alert.alert('Delete Note', 'Are you sure you want to delete this Note?', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'OK', 
				onPress: () => {
					console.log('OK Pressed, Deleted ' + note.id);
					handleDelete()
				}
			},
		]);
	}

	return <View style={noteEntryStyle.container}>
		<Text style={noteEntryStyle.content}>{note.content}</Text>
		<Link href={{
			pathname:"/edit-note/[id]",
			params:{ id: note.id }
		}}>Edit</Link>
		<Pressable onPress={handleDeletePress}><Text>Delete</Text></Pressable>
	</View>
}

const noteEntryStyle = StyleSheet.create({
	container: {
		flexDirection:"row",
		gap:10
	},
	content: {
		flex:1
	}
});