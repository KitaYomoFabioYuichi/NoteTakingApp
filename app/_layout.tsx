import { Stack } from "expo-router";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DevToolsBubble } from 'react-native-react-query-devtools';

const queryClient = new QueryClient()

export default function RootLayout() {
	return <QueryClientProvider client={queryClient}>
		<Stack>
			<Stack.Screen name="index" />
			<Stack.Screen name="(notes)" />
		</Stack>
	</QueryClientProvider>
}
