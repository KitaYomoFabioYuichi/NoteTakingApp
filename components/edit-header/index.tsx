import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import HeaderButton from '@/components/header-button';
import BackIcon from './back-icon';
import SaveIcon from './save-icon';
import { router } from 'expo-router';

interface EditHeaderProps extends NativeStackHeaderProps{
	onSavePress?:()=>void,
	disabled?:boolean
}

export default function EditHeader({
    options,
    route,
	onSavePress,
	disabled = false
}:EditHeaderProps){
    const title = getHeaderTitle(options, route.name);
    return <View style={styles.container}>
        <View style={styles.titleContainer}>
            <HeaderButton onPress={router.back}><BackIcon/></HeaderButton>
            <Text style={styles.title}>{title}</Text>
        </View>
		<View style={styles.buttonContainer}>
			<HeaderButton onPress={onSavePress} disabled={disabled} disabledColor='#ffffffee'>
				<SaveIcon/>
			</HeaderButton>
		</View>
    </View>
}

const styles = StyleSheet.create({
	container:{
		marginTop:32,
        paddingLeft:10,
		paddingRight:20,
		height:72,
		backgroundColor:"#FFFFFF",
		borderBottomWidth:1,
		borderBottomColor:"#E5E7EB",

		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
	},
    titleContainer:{
        flexDirection:"row",
		alignItems:"center",
		gap:16,
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