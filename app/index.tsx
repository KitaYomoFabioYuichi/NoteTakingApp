import { getAllNotes } from '@/api/note-api';
import ListHeader from '@/components/list-header';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
	const {data, isLoading, error} = useQuery({
		queryKey:["notes"],
		queryFn:getAllNotes
	})

	if(error) return <View style={styles.container}>
		<Text>There was an error: {error.message}</Text>
	</View>
	if(isLoading || !data) return <View style={styles.container}>
		<Text>Loading...</Text>
	</View>

	return <View style={styles.container}>
		<Stack.Screen 
			options={{
				title:"Notes",
				header:props=><ListHeader {...props}/>
			}}
		/>

		<Text>Home</Text>
		{data.map(n=><Text key={n.id}>{n.content}</Text>)}
	</View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});