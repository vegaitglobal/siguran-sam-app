import DefaultLogo from '@/shared/assets/images/logo-with-text.svg';
import { AppButton, ScreenTemplate } from '@/shared/components';
import { LoadingImage } from '@/shared/components/loading-image/loading-image';
import { AppScreen } from '@/shared/constants';
import { useContentStore } from '@/shared/store';
import { Colors } from '@/shared/styles';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import RenderHtml, { HTMLSource } from 'react-native-render-html';
import contentService from 'src/services/content/content.service';

interface Props extends NativeStackScreenProps<RootStackParamList, AppScreen.ONBOARDING_TERMS> {}

const OnboardingTermsScreen = ({ navigation }: Props) => {
  const [termsContent, setTerms] = useState<HTMLSource>();

  const { logoWithText: logo } = useContentStore();

  const { width } = useWindowDimensions();

  // TODO check internet connectivity

  // TODO think of moving this to root stack
  useEffect(() => {
    contentService.getTermsAndConditions().then((result) => {
      result && setTerms({ html: result.content });
    });
  }, []);

  const acceptOnPressHandler = () => {
    navigation.replace(AppScreen.ONBOARDING);
  };

  return (
    <ScreenTemplate>
      <View style={styles.screenContainer}>
        <Animated.View entering={FadeIn.delay(500)}>
          {logo ? (
            <LoadingImage imageUrl={logo.url} isSVG={logo.isSVG} />
          ) : (
            <DefaultLogo style={styles.logo} />
          )}
        </Animated.View>
        <Animated.View entering={FadeIn.delay(500)} style={styles.content}>
          {termsContent ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <RenderHtml contentWidth={width} source={termsContent} tagsStyles={styles} />
            </ScrollView>
          ) : (
            <LoadingIndicator />
          )}
        </Animated.View>
        <Animated.View entering={FadeIn.delay(500)}>
          <AppButton onPress={acceptOnPressHandler}>PRIHVATI USLOVE KORIŠĆENJA</AppButton>
        </Animated.View>
      </View>
    </ScreenTemplate>
  );
};

const LoadingIndicator = () => (
  <Animated.View exiting={FadeOut.delay(500)}>
    <ActivityIndicator size='small' />
  </Animated.View>
);

export default OnboardingTermsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 26,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { marginTop: 26 },

  body: {
    color: Colors.WHITE.PRIMARY,
  },
});
