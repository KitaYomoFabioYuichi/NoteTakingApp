import { StyleSheet } from "react-native";
import Button, { ButtonProps } from "@/components/button";

export default function HeaderButton({
    children,
    ...props
}:ButtonProps){
    return <Button outerStyle={style.container} {...props}>
        {children}
    </Button>
}

const style = StyleSheet.create({
    container:{
        borderRadius:9999,
        overflow:"hidden",
        width:48,
        height:48,
        justifyContent:"center",
        alignItems:"center"
    }
})