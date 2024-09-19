import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ListHeader from "@/components/list-header";

const queryClient = new QueryClient()

export default function RootLayout() {
	return <QueryClientProvider client={queryClient}>
		<Stack>
			<Stack.Screen name="index" />
			<Stack.Screen name="add-note" />
		</Stack>
	</QueryClientProvider>
}