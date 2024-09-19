import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import AddIcon from './add-icon';
import SearchIcon from './search-icon';
import HeaderButton from '@/components/header-button';
import { router } from 'expo-router';

export default function ListHeader({
    options,
    route,
}:NativeStackHeaderProps){
    const title = getHeaderTitle(options, route.name);
    
    return <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
		<View style={styles.buttonContainer}>
			<HeaderButton>
				<SearchIcon/>
			</HeaderButton>
			<HeaderButton onPress={()=>router.navigate("/add-note")}>
				<AddIcon/>
			</HeaderButton>
		</View>
    </View>
}

const styles = StyleSheet.create({
	container:{
		marginTop:32,
		paddingHorizontal:20,
		height:72,
		backgroundColor:"#FFFFFF",
		borderBottomWidth:1,
		borderBottomColor:"#E5E7EB",

		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
	},
	title:{
		fontSize:20,
		fontWeight:"bold",
	},
	buttonContainer:{
		flexDirection:"row",
		alignItems:"center",
		gap:8,
	},
})