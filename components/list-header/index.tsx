import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AddIcon from './add-icon';
import HeaderButton from '@/components/inputs/header-button';
import { router } from 'expo-router';
import CancelIcon from './cancel-icon';
import TrashIcon from './trash-icon';
import SearchIcon from './search-icon';
import LimitTextInput from '../inputs/limit-text-input';
import ColorPicker from '../inputs/color-picker';
import { NoteColor } from '@/types/note';

interface ListHeaderProps extends NativeStackHeaderProps{
	queries?:{
		removeEntries:(ids:number[])=>Promise<void>
	},
	selectMode?:{
		isSelectMode:boolean,
		selectedEntries:number[],
		exitSelectMode:()=>void
	},
	searchMode?:{
		isSearchMode:()=>boolean,
		enterSearchMode: ()=>void,
		exitSearchMode: ()=>void,
		filterText:string,
		filterColor:NoteColor|"",
		setFilterText:(v:string)=>void,
		setFilterColor:(v:NoteColor|"")=>void
	}
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
	searchMode = {
		isSearchMode: ()=>false,
		enterSearchMode: ()=>{},
		exitSearchMode: ()=>{},
		filterText:"",
		filterColor:"",
		setFilterText:(v)=>{},
		setFilterColor:(v)=>{},
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

    return <View>
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.buttonContainer}>
				<HeaderButton onPress={()=>{
					if(searchMode.isSearchMode()) searchMode.exitSearchMode()
					else searchMode.enterSearchMode();
				}}>
					<SearchIcon/>
				</HeaderButton>
				<HeaderButton onPress={()=>router.navigate("/add-note")}>
					<AddIcon/>
				</HeaderButton>
			</View>
		</View>
		{searchMode.isSearchMode()&&<View style={[styles.searchContainer]}>
			<View style={{flexDirection:'row', gap:8, alignItems:"center"}}>
				<Text style={styles.searchTitle}>Search: </Text>
				<LimitTextInput 
					style={{flex:1}} 
					value={searchMode.filterText} 
					setValue={searchMode.setFilterText}
				/>
			</View>
			<ColorPicker 
				allowEmpty={true} 
				value={searchMode.filterColor} 
				setValue={searchMode.setFilterColor}
			/>
		</View>}
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
	searchContainer:{
		paddingVertical:16,
		paddingHorizontal:20,
		backgroundColor:"#FFFFFF",
		borderBottomWidth:1,
		borderBottomColor:"#E5E7EB",
		zIndex:-1,
		gap:16,
	},
	searchTitle:{
		fontSize:20,
		fontWeight:"bold"
	}
})