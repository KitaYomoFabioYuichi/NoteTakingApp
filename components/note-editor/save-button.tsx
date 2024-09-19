import Button from "@/components/button";
import { StyleSheet, Text } from "react-native";

export default function SaveButton(){
    return <Button outerStyle={styles.button} rippleColor="#ffffff50">
        <Text style={styles.buttonInner}>Save</Text>
    </Button>
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#1F2937",
        borderRadius:10,
        height:40
    },
    buttonInner:{
        color:"#FFFFFF",
        fontSize:16,
        fontWeight:"bold"
    }
})