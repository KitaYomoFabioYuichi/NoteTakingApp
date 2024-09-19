import { getAllNotes } from '@/api/note-api';
import ListHeader from '@/components/list-header';
import NoteEntry from '@/components/note-list/note-entry';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
	const {data, isLoading, error} = useQuery({
		queryKey:["notes"],
		queryFn:getAllNotes
	})

	if(error) return <View style={styles.centerContainer}>
		<Text>There was an error: {error.message}</Text>
	</View>

	if(isLoading || !data) return <View style={styles.centerContainer}>
		<Text>Loading...</Text>
	</View>

	return <View style={styles.container}>
		<Stack.Screen 
			options={{
				title:"Notes",
				header:props=><ListHeader {...props}/>
			}}
		/>
		<ScrollView contentContainerStyle={styles.scrollInnerContainer}>
			{data.map(n=><NoteEntry key={n.id} note={n}/>)}
		</ScrollView>
	</View>
}

const styles = StyleSheet.create({
	centerContainer:{
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:"white"
	},
	container: {
		flex: 1,
		backgroundColor:"white"
	},
	scrollInnerContainer:{
		padding:16,
		gap:16
	}
});