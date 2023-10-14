import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../bottom-tabs';
import { useAppInit } from '@/shared/hooks';
import SplashScreen from '@/domain/splash/screens/splash-screen';
import { Colors } from '@/shared/styles';
import { styles } from './root-stack.style';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
	const initialized = useAppInit();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
				contentStyle: styles.contentStyle,
			}}
		>
			{!initialized ? (
				<Stack.Screen name={AppScreen.SPLASH} component={SplashScreen} />
			) : (
				<Stack.Group>
					<Stack.Screen name={AppScreen.BOTTOM_TABS} component={BottomTabs} />
				</Stack.Group>
			)}
		</Stack.Navigator>
	);
};

export default RootStack;
