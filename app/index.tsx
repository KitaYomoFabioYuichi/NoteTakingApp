import { getAllNotes, removeMultiple } from '@/api/note-api';
import ListHeader from '@/components/list-header';
import LoadingModal from '@/components/loading-modal';
import NoteEntry from '@/components/note-list/note-entry';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, BackHandler } from 'react-native';

export default function HomeScreen() {
	//Handle queries
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: ["notes"],
		queryFn: getAllNotes
	})

	const queryClient = useQueryClient();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: removeMultiple,
		onSuccess:()=>{
			queryClient.invalidateQueries({queryKey:["notes"]});
			setSelectedEntries([]);
		}
	})

	const loading = isLoading || isFetching || isPending || !data;

	//Handle Select mode
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

	//Render
	if (error) return <View style={styles.centerContainer}>
		<Text>There was an error: {error.message}</Text>
	</View>

	return <View style={styles.container}>
		<Stack.Screen
			options={{
				title: "Notes",
				header: props => <ListHeader 
					selectedEntries = {selectedEntries}
					setSelectedEntries = {setSelectedEntries}
					handleDelete={mutateAsync}
					{...props} 
				/>
			}}
		/>
		<LoadingModal visible={loading}/>
		<ScrollView contentContainerStyle={styles.scrollInnerContainer}>
			<View style={styles.noteListContainer}>
				{[...(data||[])].reverse().map(n =>{
					const selected = selectedEntries.includes(n.id);

					const handleToggle = ()=>{
						if(!selected) setSelectedEntries([...selectedEntries, n.id]);
						else setSelectedEntries(selectedEntries.filter(id=>id!==n.id));
					}

					return <NoteEntry
						key={n.id}
						note={n}
						onPress={() => {
							if(isSelectMode) handleToggle();
							else console.log("View Entry");
						}}
						onLongPress={handleToggle}
						selected={selected}
					/>
				})}
			</View>
		</ScrollView>
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
	}
});