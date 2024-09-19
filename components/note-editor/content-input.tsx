import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import TextInputLimitCounter from "./text-input-limit-counter";

interface ContentInputProps{
    value:string,
    setValue:(text:string)=>void,
    editable?:boolean
}

export default function ContentInput({
    value,
    setValue,
    editable = true
}:ContentInputProps){
    const maxLength = 2000;

    return <View style={styles.container}>
        <ScrollView 
            style={styles.inputScrollContainer}
            contentContainerStyle={styles.inputScrollInnerContainer}
        >
            <TextInput
                style={styles.textInput}
                value={value}
                onChangeText={setValue}
                maxLength={maxLength}
                editable={editable}
                multiline
            />
        </ScrollView>
        <TextInputLimitCounter 
            style={styles.limitCounter} 
            length={value.length} maxLength={maxLength}
        />
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFFFFF",
        borderRadius:10,
        borderWidth:1,
        borderColor:"#E5E7EB",
        overflow:"hidden",
    },
    inputScrollContainer:{
        flex:1
    },
    inputScrollInnerContainer:{
        flexGrow:1
    },
    textInput:{
        flex:1,
        paddingHorizontal:16,
        paddingVertical:8,
        fontSize:16,
        textAlignVertical:"top"
    },
    limitCounter:{
        paddingHorizontal:16,
        paddingVertical:4
    }
})