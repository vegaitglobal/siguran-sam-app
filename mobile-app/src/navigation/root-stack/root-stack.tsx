import BlogPostScreen from '@/domain/education/screens/blog-post';
import BlogPostListScreen from '@/domain/education/screens/blog-post-list';
import OnboardingScreen from '@/domain/onboarding/screens/onboarding-screen';
import OnboardingTermsScreen from '@/domain/onboarding/screens/onboarding-terms-screen';
import WelcomeScreen from '@/domain/onboarding/screens/welcome-screen';
import { MoreOptionsScreen } from '@/domain/other';
import TermsScreen from '@/domain/other/screens/terms-screen';
import SplashScreen from '@/domain/splash/screens/splash-screen';
import { AppScreen } from '@/shared/constants';
import { useAppInit } from '@/shared/hooks';
import { useOnboardingStore } from '@/shared/store';
import { RootStackParamList } from '@/shared/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../bottom-tabs';
import { styles } from './root-stack.style';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const initialized = useAppInit();
  const isOnboardingDone = useOnboardingStore((state) => state.isOnboardingDone);

  // To be used only for testing onboarding flow
  // useEffect(() => {
  //   resetOnboarding();
  // }, []);

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
          <Stack.Screen name={AppScreen.MORE_OPTIONS} component={MoreOptionsScreen} />
          <Stack.Screen name={AppScreen.BLOGPOSTLIST} component={BlogPostListScreen} />
          <Stack.Screen name={AppScreen.BLOGPOST} component={BlogPostScreen} />
          <Stack.Screen name={AppScreen.TERMS} component={TermsScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name={AppScreen.ONBOARDING_TERMS} component={OnboardingTermsScreen} />
          <Stack.Screen name={AppScreen.ONBOARDING} component={OnboardingScreen} />
          <Stack.Screen name={AppScreen.WELCOME} component={WelcomeScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
