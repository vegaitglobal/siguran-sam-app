import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../bottom-tabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}
		>
			<Stack.Screen name={AppScreen.BOTTOM_TABS} component={BottomTabs} />
		</Stack.Navigator>
	);
};

export default RootStack;
