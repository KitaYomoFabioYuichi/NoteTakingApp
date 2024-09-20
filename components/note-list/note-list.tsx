import { getAllNotes } from "@/api/note-api";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import NoteEntry from "./note-entry";
import { Note, NoteColor } from "@/types/note";
import { Href, router } from "expo-router";
import EmptyIcon from "./empty-icon";
import NoteArrowIcon from "./note-arrow-icon";

interface NoteListProps{
    selectedEntries:number[],
    setSelectedEntries:(v:number[])=>void
}


export default function NoteList({
    selectedEntries,
    setSelectedEntries
}:NoteListProps){
    const {data, isLoading, error} = useQuery({
        queryFn:()=>getAllNotes(),
        queryKey:["notes"],
    })
    const entries = data||[];

    const renderError = ()=>{
        console.log("Hello");
        
        return <View style={styles.centerContainer}>
            <Text>There was an error</Text>
        </View>
    }

    const renderLoading = ()=>{
        return <View style={styles.centerContainer}>
            <Text>Loading...</Text>
        </View>
    }

    const renderEmpty = ()=>{
		return <View style={styles.emptyContainer}>
			<View style={styles.emptyIconContainer}>
				<EmptyIcon/>
				<Text style={styles.emptyText}>You have no notes</Text>
			</View>
			<View style={styles.emptyNote}>
				<NoteArrowIcon/>
				<Text style={styles.emptyNoteText}>Add a new one here!</Text>
			</View>
		</View>
	}

    const renderNotes = ()=>{
        return <ScrollView>
            <View style={styles.noteListContainer}>
                {[...entries].reverse().map(note=>{
                    const selected = selectedEntries.includes(note.id);
                    const isSelectMode = selectedEntries.length > 0;

                    const select = ()=>{
                        setSelectedEntries([...selectedEntries, note.id])
                    }
                
                    const deselect = ()=>{
                        setSelectedEntries(selectedEntries.filter(id=>id!=note.id));
                    }

                    return <NoteEntry
                        key={note.id}
                        note={note}
                        selected={selected}
                        onLongPress={()=>{
                            if(!isSelectMode) select();
                        }}
                        onPress={()=>{
                            if(!isSelectMode) router.navigate(("/edit-note/"+note.id) as Href);
                            else if(!selected) select();
                            else deselect();
                        }}
                    />
                })}
            </View>
        </ScrollView>
    }

    if(isLoading) return renderLoading();
    else if(error) return renderError();
    else if(entries.length <= 0) return renderEmpty();
    else return renderNotes();
}

const styles = StyleSheet.create({
    noteListContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		gap: 16,
        padding:16,
	},
    centerContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
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
		fontSize:20,
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