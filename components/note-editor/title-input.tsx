import { StyleSheet, Text, TextInput, View } from "react-native"
import TextInputLimitCounter from "./text-input-limit-counter";

interface TitleInputProps{
    value:string,
    setValue:(text:string)=>void,
    editable?:boolean
}

export default function TitleInput({
    value,
    setValue,
    editable = true
}:TitleInputProps){
    const maxLength = 50;

    return <View style={styles.container}>
        <TextInput 
            style={styles.textInput} 
            value={value} 
            onChangeText={setValue}
            placeholder="Title"
            maxLength={maxLength}
            editable={editable}
        />
        <TextInputLimitCounter 
            style={styles.limitCounter} 
            length={value.length} maxLength={maxLength}
        />
    </View>
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:"#FFFFFF",
        borderRadius:10,
        borderWidth:1,
        borderColor:"#E5E7EB",
        overflow:"hidden",
    },
    textInput:{
        paddingLeft:16,
        paddingRight:8,
        paddingVertical:8,
        flex:1,
        fontSize:20,
        fontWeight:"bold",
    },
    limitCounter:{
        paddingVertical:2,
        paddingRight:8
    }
})