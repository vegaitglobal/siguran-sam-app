import RootStack from '@/navigation/root-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<StatusBar style='auto' />
				<RootStack />
			</NavigationContainer>
		</SafeAreaProvider>
	);
};