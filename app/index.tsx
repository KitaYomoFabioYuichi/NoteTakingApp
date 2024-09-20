import ListHeader from "@/components/list-header";
import NoteList from "@/components/note-list/note-list";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
	const [selectedEntries, setSelectedEntries] = useState<number[]>([]);

	return <View style={styles.container}>
		<Stack.Screen
			options={{
				title: "Notes",
				header: props => <ListHeader
					selectedEntries={selectedEntries}
					setSelectedEntries={setSelectedEntries}
					{...props} 
				/>
			}}
		/>
		<NoteList 
			selectedEntries={selectedEntries} 
			setSelectedEntries={setSelectedEntries}
		/>
	</View>
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:"white"
	}
});