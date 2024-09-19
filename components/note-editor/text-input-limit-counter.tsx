import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface TextInputLimitCounterProps{
    length:number,
    maxLength:number,
    style?:StyleProp<ViewStyle>
}

export default function TextInputLimitCounter({
    length,
    maxLength,
    style
}:TextInputLimitCounterProps){
    return <View style={[styles.limitCounterContainer, style]}>
        <Text style={styles.limitCounter}>{length}/{maxLength}</Text>
    </View>
}

const styles = StyleSheet.create({
    limitCounterContainer:{
        alignItems:"flex-end",
        justifyContent:"flex-end"
    },
    limitCounter:{
        color:"#9CA3AF"
    },
})