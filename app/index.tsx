import { getAllNotes, removeMultiple } from '@/api/note-api';

import ListHeader from '@/components/list-header';
import LoadingModal from '@/components/loading-modal';
import EmptyIcon from '@/components/note-list/empty-icon';
import NoteArrowIcon from '@/components/note-list/note-arrow-icon';
import NoteEntry from '@/components/note-list/note-entry';

import { Note } from '@/types/note';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Href, router, Stack, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, BackHandler } from 'react-native';

export default function HomeScreen() {
	//Handle queries
	const queries = useHandleQuery();

	//Handle Select mode
	const selectMode = useHandleSelectMode();

	//Render
	if (queries.error) return <View style={styles.centerContainer}>
		<Text style={styles.emptyText}>There was an error &#9785;</Text>
	</View>

	const renderNotes = ()=>{
		return <ScrollView contentContainerStyle={styles.scrollInnerContainer}>
				<View style={styles.noteListContainer}>
				{[...(queries.entries)].reverse().map(n =><NoteEntry
					key={n.id}
					onPress={()=>{
						if(selectMode.isSelectMode){
							if(!selectMode.isNoteSelected(n)) selectMode.selectNote(n);
							else selectMode.deselectNote(n);
						}
						else router.navigate(('/edit-note/'+n.id) as Href);
					}}
					onLongPress={()=>{
						if(!selectMode.isSelectMode) selectMode.selectNote(n);
					}}
					note={n}
					selected={selectMode.isNoteSelected(n)}
				/>)}
			</View>
		</ScrollView>
	}

	const renderEmpty = ()=>{
		return <View style={styles.emptyContainer}>
			<View style={styles.emptyIconContainer}>
				<EmptyIcon/>
				<Text style={styles.emptyText}>Opps!</Text>
				<Text style={styles.emptyText}>You have no notes.</Text>
			</View>
			<View style={styles.emptyNote}>
				<NoteArrowIcon/>
				<Text style={styles.emptyNoteText}>Add a new one here!</Text>
			</View>
		</View>
	}

	return <View style={styles.container}>
		<Stack.Screen
			options={{
				title: "Notes",
				header: props => <ListHeader queries={queries} selectMode={selectMode} {...props} />
			}}
		/>
		<LoadingModal visible={queries.isLoading}/>
		{queries.entries.length <= 0?renderEmpty():renderNotes()}
	</View>
}

const styles = StyleSheet.create({
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white"
	},
	container: {
		flex: 1,
		backgroundColor: "white"
	},
	scrollInnerContainer: {
		padding: 16
	},
	noteListContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		gap: 16,
	},

	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white"
	},
	emptyIconContainer:{
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white"
	},
	emptyText:{
		fontWeight:"bold",
		fontSize:24,
		color:"#6B7280"
	},
	emptyNote:{
		position:"absolute",
		top:25,
		right:36,
		width:100,
		alignItems:"flex-end"
	},
	emptyNoteText:{
		fontSize:14,
		color:"#6B7280",
		textAlign:"center"
	}
});

function useHandleQuery(){
	const {data, isFetching, error: fetchError} = useQuery({ queryKey: ["notes"], queryFn: getAllNotes });

	const queryClient = useQueryClient();
	const { mutateAsync, error:mutateError } = useMutation({ mutationFn: removeMultiple, onSuccess:()=>{
		queryClient.invalidateQueries({queryKey:["notes"]});
	}})

	const isLoading = isFetching;

	return {
		entries:data||[],
		error: fetchError || mutateError,
		mutateError,
		isLoading,
		removeEntries:mutateAsync
	};
}

function useHandleSelectMode(){
	const [selectedEntries, setSelectedEntries] = useState<number[]>([]);
	const isSelectMode = selectedEntries.length > 0;
	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				if(isSelectMode){
					setSelectedEntries([]);
					return true;
				}else{
					return false;
				}
			};

			const subscription = BackHandler.addEventListener(
				'hardwareBackPress',
				onBackPress
			);

			return () => subscription.remove();
		}, [selectedEntries])
	);

	const isNoteSelected = (note:Note)=>{
		return selectedEntries.includes(note.id);
	}

	const selectNote = (note:Note)=>{
		if(isNoteSelected(note)) return;
		setSelectedEntries([...selectedEntries, note.id]);
	}

	const deselectNote = (note:Note)=>{
		if(!isNoteSelected(note)) return;
		setSelectedEntries(selectedEntries.filter(id=>id!==note.id));
	}

	const exitSelectMode = ()=>{
		setSelectedEntries([]);
	}

	return {
		selectedEntries,
		isSelectMode,
		isNoteSelected,
		selectNote,
		deselectNote,
		exitSelectMode
	}
}