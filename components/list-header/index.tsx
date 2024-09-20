import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import AddIcon from './add-icon';
import CancelIcon from './cancel-icon';
import TrashIcon from './trash-icon';

import HeaderButton from '@/components/inputs/header-button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeAllNotes } from '@/api/note-api';
import LoadingModal from '../loading-modal';

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

	const queryClient = useQueryClient();
	const {mutateAsync, isPending} = useMutation({
		mutationFn:removeAllNotes,
		onSuccess:()=>{
			queryClient.invalidateQueries({queryKey:["notes"]});
			setSelectedEntries([]);
		}
	})

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

	const renderSelectMode = ()=>{
		return <View style={styles.selectModeContainer}>
			<View style={styles.buttonContainer}>
				<HeaderButton onPress={()=>setSelectedEntries([])}>
					<CancelIcon/>
				</HeaderButton>
				<Text style={styles.title}>{selectedCount}</Text>
			</View>
			<View style={styles.buttonContainer}>
				<HeaderButton onPress={handleAlert}>
					<TrashIcon/>
				</HeaderButton>
			</View>
		</View>
	}

	const render = ()=>{
		return <>
			<View style={styles.container}>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.buttonContainer}>
					<HeaderButton onPress={()=>router.navigate("/add-note")}>
						<AddIcon/>
					</HeaderButton>
				</View>
			</View>
		</>
	}

    return <View>
		{isPending&&<LoadingModal/>}
		{isSelectMode?renderSelectMode():render()}
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