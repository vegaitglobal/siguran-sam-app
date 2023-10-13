import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import RootStack from 'src/navigation/root-stack';

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style='auto' />
			<RootStack />
		</NavigationContainer>
	);
}
