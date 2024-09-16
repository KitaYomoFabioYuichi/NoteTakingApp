import { Stack } from "expo-router";

export default function RootLayout() {
	return <Stack>
        <Stack.Screen name="note-list" />
        <Stack.Screen name="add-note" />
        <Stack.Screen name="edit-note/[id]" />
    </Stack>
}
