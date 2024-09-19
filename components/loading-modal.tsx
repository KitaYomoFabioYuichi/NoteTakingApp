import { Modal, ModalProps, StyleSheet, Text, View } from "react-native";

export default function LoadingModal({
    style,
    ...props
}:ModalProps){
    return <Modal style={[styles.container, style]} animationType="fade" transparent={true} {...props}>
        <View style={styles.loadingContainer}>
            <View style={styles.loadingPanel}>
                <Text>Loading...</Text>
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    loadingContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#00000050"
    },
    loadingPanel:{
        padding:16,
        backgroundColor:"white",
        borderColor:"#e5e7eb",
        borderWidth:1,
        borderRadius:10
    }
})