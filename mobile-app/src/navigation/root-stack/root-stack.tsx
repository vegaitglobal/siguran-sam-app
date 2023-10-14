import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../bottom-tabs';
import { useAppInit } from '@/shared/hooks';
import SplashScreen from '@/domain/splash/screens/splash-screen';
import { styles } from './root-stack.style';
import { useOnboardingStore } from '@/shared/store';
import OnboardingScreen from '@/domain/onboarding/screens/onboarding-screen';
import TermsScreen from '@/domain/onboarding/screens/terms-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
	const initialized = useAppInit();
	const isOnboardingDone = useOnboardingStore(
		(state) => state.isOnboardingDone
	);

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
			) : isOnboardingDone ? (
				<Stack.Group>
					<Stack.Screen name={AppScreen.BOTTOM_TABS} component={BottomTabs} />
				</Stack.Group>
			) : (
				<Stack.Group>
					<Stack.Screen name={AppScreen.TERMS} component={TermsScreen} />
					<Stack.Screen
						name={AppScreen.ONBOARDING}
						component={OnboardingScreen}
					/>
				</Stack.Group>
			)}
		</Stack.Navigator>
	);
};

export default RootStack;
