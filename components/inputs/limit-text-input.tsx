import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native"
import TextInputLimitCounter from "./text-input-limit-counter"

export interface LimitTextInputProps{
    value:string,
    setValue:(text:string)=>void,
    editable?:boolean,
    maxLength?:number,
    style?:StyleProp<ViewStyle>,
    textInputStyle?:StyleProp<TextStyle>,
    placeholder?:string
}

export default function LimitTextInput({
    value,
    setValue,
    editable = true,
    maxLength = 100,
    style = {},
    textInputStyle = {},
    placeholder = ""
}:LimitTextInputProps){
    return <View style={[styles.container, style]}>
        <TextInput 
            style={[styles.textInput, textInputStyle]} 
            value={value} 
            onChangeText={setValue}
            placeholder={placeholder}
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
        fontSize:16
    },
    limitCounter:{
        paddingVertical:2,
        paddingRight:8
    }
})