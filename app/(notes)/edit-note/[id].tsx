import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditNote(){
    const { id } = useLocalSearchParams();

    return <View>
        <Text>{ id }</Text>
    </View>
}