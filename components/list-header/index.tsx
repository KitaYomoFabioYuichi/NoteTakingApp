import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AddIcon from './add-icon';
import HeaderButton from '@/components/header-button';
import { router } from 'expo-router';
import CancelIcon from './cancel-icon';
import TrashIcon from './trash-icon';

interface ListHeaderProps extends NativeStackHeaderProps{
	queries?:{
		removeEntries:(ids:number[])=>Promise<void>
	},
	selectMode?:{
		isSelectMode:boolean,
		selectedEntries:number[],
		exitSelectMode:()=>void
	},
}

export default function ListHeader({
	queries = {
		removeEntries: async (ids:number[])=>{}
	},
	selectMode = {
		isSelectMode: false,
		selectedEntries: [],
		exitSelectMode: ()=>{}
	},
    options,
    route,
}:ListHeaderProps){
    const title = getHeaderTitle(options, route.name);
	const selectedCount = selectMode.selectedEntries.length;

	const handleAlert = ()=>{
		Alert.alert(
			`Delete notes?`, 
			`Are you sure you want to delete the selected ${selectedCount} ${selectedCount>1?"notes":"note"}?`,
			[
				{text: "Cancel",style:"cancel"}, 
				{text:"Accept", onPress:()=>{
					queries.removeEntries(selectMode.selectedEntries);
					selectMode.exitSelectMode();
				}}
			]
		)
	}

	if(selectMode.isSelectMode) return <View style={styles.selectModeContainer}>
		<View style={styles.buttonContainer}>
			<HeaderButton onPress={selectMode.exitSelectMode}>
				<CancelIcon/>
			</HeaderButton>
			<Text  style={styles.title}>{selectedCount}</Text>
		</View>
		<View style={styles.buttonContainer}>
			<HeaderButton onPress={handleAlert}>
				<TrashIcon/>
			</HeaderButton>
		</View>
	</View>

    return <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
		<View style={styles.buttonContainer}>
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
	selectModeContainer:{
		marginTop:32,
		paddingHorizontal:20,
		paddingLeft:10,
		height:72,
		backgroundColor:"#FFFFFF",
		borderBottomWidth:1,
		borderBottomColor:"#E5E7EB",

		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
	},
})