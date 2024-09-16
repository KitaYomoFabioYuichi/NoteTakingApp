import { addNote } from "@/api/note-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddNoteScreen(){
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn:addNote,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["notes"]}),
            router.navigate("/note-list")
        }
    })

    const [content, setContent] = useState("");


    return <View style={styles.container}>
        <Pressable onPress={e=>{
            Keyboard.dismiss();
            mutate({
                content,
                createTime: new Date(),
                lastUpdateTime: new Date()
            });
        }}>
            <Text>
                Add Note
            </Text>
        </Pressable>
        <View style={styles.textEditor}>
            <TextInput editable multiline value={content} onChangeText={setContent}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        padding:50
	},
    textEditor: {
        backgroundColor:"#FFFFFF",

    }
});