import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import AddIcon from './add-icon';
import CancelIcon from './cancel-icon';
import TrashIcon from './trash-icon';

import HeaderButton from '@/components/inputs/header-button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeAllNotes } from '@/api/note-api';
import LoadingModal from '../loading-modal';
import FadeView from '../containers/fade-div';

interface ListHeaderProps extends NativeStackHeaderProps{
	selectedEntries:number[],
	setSelectedEntries:(v:number[])=>void
}

export default function ListHeader({
	selectedEntries = [],
	setSelectedEntries = (v:number[])=>{},

    options,
    route,
}:ListHeaderProps){
    const title = getHeaderTitle(options, route.name);

	const selectedCount = selectedEntries.length;
	const isSelectMode = selectedCount > 0;

    return <View style={styles.container}>
		{/*Render this if not select mode*/}
		<FadeView style={styles.content}  visible={!isSelectMode}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.buttonContainer}>
				<HeaderButton onPress={()=>router.navigate("/add-note")}>
					<AddIcon/>
				</HeaderButton>
			</View>
		</FadeView>

		{/*Otherwise This*/}
		<SelectModeHeaderContent 
			selectedEntries={selectedEntries} 
			setSelectedEntries={setSelectedEntries}
		/>
	</View>
}

interface SelectModeHeaderContentProps{
	selectedEntries:number[],
	setSelectedEntries:(v:number[])=>void
}

function SelectModeHeaderContent({
	selectedEntries,
	setSelectedEntries
}:SelectModeHeaderContentProps){
	const selectedCount = selectedEntries.length;
	const isSelectMode = selectedCount > 0;

	const [displaySelectedCount, setDisplaySelectedCount] = useState(selectedCount);
	useEffect(()=>{
		if(isSelectMode) setDisplaySelectedCount(selectedCount)
	},[selectedEntries])

	const queryClient = useQueryClient();
	const {mutateAsync, isPending} = useMutation({
		mutationFn:removeAllNotes,
		onSuccess:()=>{
			queryClient.invalidateQueries({queryKey:["notes"]});
			setSelectedEntries([]);
		}
	});

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				if(isSelectMode){
					setSelectedEntries([]);
					return true;
				}else{
					return false;
				}
			};

			const subscription = BackHandler.addEventListener( 'hardwareBackPress', onBackPress );

			return () => subscription.remove();
		}, [selectedEntries])
	);

	const handleAlert = ()=>{
		Alert.alert(
			`Delete notes?`, 
			`Are you sure you want to delete the selected ${selectedCount} ${selectedCount>1?"notes":"note"}?`,
			[
				{text: "Cancel",style:"cancel"}, 
				{text:"Accept", onPress:()=>mutateAsync(selectedEntries)}
			]
		)
	}

	return <>
		{isPending&&<LoadingModal/>}
		<FadeView style={styles.selectContent} visible={isSelectMode}>
			<View style={styles.buttonContainer}>
				<HeaderButton onPress={()=>setSelectedEntries([])}>
					<CancelIcon/>
				</HeaderButton>
				<Text style={styles.title}>{displaySelectedCount}</Text>
			</View>
			<View style={styles.buttonContainer}>
				<HeaderButton onPress={()=>isSelectMode&&handleAlert()}>
					<TrashIcon/>
				</HeaderButton>
			</View>
		</FadeView>
	</>
}

const styles = StyleSheet.create({
	container:{
		marginTop:32,
		height:72,
		backgroundColor:"#FFFFFF",
		borderBottomWidth:1,
		borderBottomColor:"#E5E7EB",
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
	content:{
		position:"absolute",
		top:0, bottom:0, left:0, right:0,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
		paddingHorizontal:20
	},
	selectContent:{
		position:"absolute",
		top:0, bottom:0, left:0, right:0,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
		paddingHorizontal:20,
		paddingLeft:0
	},
});

/*
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
		marginTop:32,
		paddingVertical:16,
		paddingHorizontal:20,
		paddingTop:22,
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
*/