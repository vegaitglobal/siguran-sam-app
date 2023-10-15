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
import WelcomeScreen from '@/domain/onboarding/screens/welcome-screen';
import BlogPostListScreen from '@/domain/education/screens/blog-post-list';
import BlogPostScreen from '@/domain/education/screens/blog-post';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
	const initialized = useAppInit();
	const isOnboardingDone = useOnboardingStore(
		(state) => state.isOnboardingDone
	);

	return (
		<Stack.Navigator
			initialRouteName={!initialized ? AppScreen.SPLASH : AppScreen.BOTTOM_TABS}
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
          <Stack.Screen name={AppScreen.BLOGPOSTLIST}>
            {(props) => <BlogPostListScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name={AppScreen.BLOGPOST}>
            {(props) => <BlogPostScreen {...props} />}
          </Stack.Screen>
        </Stack.Group>
			) : (
				<Stack.Group>
					<Stack.Screen name={AppScreen.TERMS} component={TermsScreen} />
					<Stack.Screen
						name={AppScreen.ONBOARDING}
						component={OnboardingScreen}
					/>
					<Stack.Screen name={AppScreen.WELCOME} component={WelcomeScreen} />
				</Stack.Group>
			)}
		</Stack.Navigator>
	);
};

export default RootStack;
