import { NoteColorValues } from "@/constants/Color";
import { Note } from "@/types/note";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";

export interface NoteEntryProps extends ViewProps{
    note:Note,
    selected?:boolean,
    onPress?:()=>void,
    onLongPress?:()=>void
}

export default function NoteEntry({
    note,
    selected = false,
    onPress,
    onLongPress,
}:NoteEntryProps){
    const { fill, border, fillShade } = NoteColorValues[note.color];

    return <View style={[selected&&styles.selectedOuterContainer]}>
        <View style={[
            selected&&styles.selected,
            styles.container, 
            {backgroundColor:fill, borderColor:border}
        ]}>
            <View style={[styles.decor, {backgroundColor:fillShade, borderColor:border}]}/>
            <Pressable 
                style={styles.innerContainer} 
                android_ripple={{color:"#00000020"}}
                onPress={onPress}
                onLongPress={onLongPress}
            >
                <Text style={styles.title}>{note.title}</Text>
                {note.content&&<Text style={styles.content} numberOfLines={6}>{note.content}</Text>}
            </Pressable>
        </View>
    </View>
}

const decorSize = 20;

const styles = StyleSheet.create({
    selectedOuterContainer:{
        backgroundColor:"#3b82f610"
    },
    container:{
        borderWidth:1,
        borderTopRightRadius:decorSize,
        overflow:"hidden"
    },
    selected:{
        transform:[{scale:0.9}]
    },
    innerContainer:{
        padding:16
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
        borderTopRightRadius:decorSize,
    }
})