import BlogPostScreen from '@/domain/education/screens/blog-post';
import BlogPostListScreen from '@/domain/education/screens/blog-post-list';
import OnboardingScreen from '@/domain/onboarding/screens/onboarding-screen';
import OnboardingTermsScreen from '@/domain/onboarding/screens/onboarding-terms-screen';
import WelcomeScreen from '@/domain/onboarding/screens/welcome-screen';
import { MoreOptionsScreen } from '@/domain/other';
import ContactDetailsScreen from '@/domain/other/screens/contact-details-screen';
import TermsScreen from '@/domain/other/screens/terms-screen';
import UserDetailsScreen from '@/domain/other/screens/user-details-screen';
import SplashScreen from '@/domain/splash/screens/splash-screen';
import { AppScreen } from '@/shared/constants';
import { useAppInit } from '@/shared/hooks';
import { setContentStore, useOnboardingStore } from '@/shared/store';
import { setPersistedMessage } from '@/shared/store/use-message-store';
import { RootStackParamList } from '@/shared/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import contentService from 'src/services/content/content.service';
import BottomTabs from '../bottom-tabs';
import { styles } from './root-stack.style';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const initialized = useAppInit();
  const isOnboardingDone = useOnboardingStore((state) => state.isOnboardingDone);

  // Fetching relevant Contentful data in root stack that will be needed in multiple parts of the app.
  // The idea is to persist the last value from Contentful to enable the app to work in offline mode
  useEffect(() => {
    contentService.getEmergencyMessage().then((result) => {
      setPersistedMessage(result.content);
    });

    contentService.getLogos().then(({ logoTextOnly, logoWithText, logoWithoutText }) => {
      setContentStore({
        logoWithText,
        logoWithoutText,
        logoTextOnly,
      });
    });
  }, []);

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
          <Stack.Screen name={AppScreen.CONTACT_DETAILS} component={ContactDetailsScreen} />
          <Stack.Screen name={AppScreen.USER_DETAILS} component={UserDetailsScreen} />
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
