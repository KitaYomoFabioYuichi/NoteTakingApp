import { NoteColorValues } from "@/constants/Color";
import { Note } from "@/types/note";
import { StyleSheet, Text, View, ViewProps } from "react-native";

export interface NoteEntryProps extends ViewProps{
    note:Note
}

export default function NoteEntry({
    note,
    style
}:NoteEntryProps){
    const { fill, border, fillShade } = NoteColorValues[note.color];

    return <View style={[styles.container, {backgroundColor:fill, borderColor:border}, style]}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.content} numberOfLines={10}>{note.content}</Text>
        <View style={[styles.decor, {backgroundColor:fillShade, borderColor:border}]}/>
    </View>
}

const decorSize = 20;

const styles = StyleSheet.create({
    container:{
        padding:16,
        borderWidth:1,
        borderTopRightRadius:decorSize
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    },
    content:{
        fontSize:16
    },
    decor:{
        position:"absolute",
        top:-1,
        right:-1,
        width:decorSize,
        height:decorSize,
        borderWidth:1,
        borderTopRightRadius:decorSize
    }
})