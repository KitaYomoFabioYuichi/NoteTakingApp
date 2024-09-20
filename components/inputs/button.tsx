import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export interface ButtonProps{
    outerStyle?:StyleProp<ViewStyle>,
    innerStyle?:StyleProp<ViewStyle>,
    rippleColor?:string,
    onPress?:(event: GestureResponderEvent)=>void,
    disabled?:boolean,
    disabledColor?:string,
    children?:ReactNode
}

export default function Button({
    outerStyle,
    innerStyle,
    rippleColor = "#00000010",
    onPress,
    children,
    disabled = false,
    disabledColor = "#00000080",
}:ButtonProps){
    return <View style={outerStyle}>
        <Pressable 
            onPress={onPress} 
            style={[styles.pressable, innerStyle]} 
            android_ripple={{color:rippleColor}}
            disabled={disabled}
        >
            {children}
        </Pressable>
        {disabled&&<View style={[styles.disabled, {backgroundColor:disabledColor}]}/>}
    </View>
}

const styles = StyleSheet.create({
    pressable:{
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        justifyContent:"center",
        alignItems:"center"
    },
    disabled:{
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
    }
})