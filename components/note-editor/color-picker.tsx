import { GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import CheckIcon from "./check-icon";
import { NoteColor } from "@/types/note";
import { NoteColorValues } from "@/constants/Color";
import Button, { ButtonProps } from "@/components/button";

interface ColorPickerProps{
    value:NoteColor,
    setValue:(value:NoteColor)=>void,
    editable?:boolean
}

const ColorList:NoteColor[] = ["WHITE", "RED", "YELLOW", "GREEN", "BLUE", "PURPLE"];

export default function ColorPicker({
    value,
    setValue,
    editable = true
}:ColorPickerProps){
    return <View style={styles.container}>
        {ColorList.map(c=><ColorButton 
            key={c} 
            color={c} 
            selected={value===c}
            onPress={()=>setValue(c)}
            disabled={!editable}
            disabledColor="#ffffff80"
        />)}
    </View>
}

interface ColorButton extends ButtonProps{
    color:NoteColor,
    selected?:boolean
}

function ColorButton({
    color,
    selected = false,
    ...props
}:ColorButton){
    const {fill, border} = NoteColorValues[color];

    return <Button 
        {...props}
        outerStyle={[styles.colorButton, { backgroundColor:fill, borderColor:border }]} 
    >
        {selected&&<CheckIcon/>}
        {selected&&<View style={styles.colorButtonDarken}/>}
    </Button>
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    colorButton:{
        width:48,
        height:48,
        borderWidth:2,
        borderRadius:9999,
        overflow:"hidden",
    },
    colorButtonDarken:{
        backgroundColor:"#00000010",
        position:"absolute", top:0, bottom:0, left:0, right:0
    }
})