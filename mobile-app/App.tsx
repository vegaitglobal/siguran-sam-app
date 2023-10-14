import RootStack from '@/navigation/root-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style='auto' />
			<RootStack />
		</NavigationContainer>
	);
};