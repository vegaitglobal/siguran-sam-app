import { AppButton, ScreenTemplate } from '@/shared/components';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import LogoWithText from '@/shared/assets/images/logo-with-text.svg';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { TermsAndConditions } from 'src/services/content/content.interfaces';
import contentService from 'src/services/content/content.service';
import RenderHtml, { HTMLSource } from 'react-native-render-html';
import { Colors } from '@/shared/styles';

interface Props extends NativeStackScreenProps<RootStackParamList, AppScreen.ONBOARDING_TERMS> {}

const OnboardingTermsScreen = ({ navigation }: Props) => {
  const [termsContent, setTerms] = useState<HTMLSource>();

  const { width } = useWindowDimensions();

  // TODO check internet connectivity

  useEffect(() => {
    contentService.getTermsAndConditions().then((result: TermsAndConditions) => {
      setTerms({ html: result.content });
    });
  }, []);

  const acceptOnPressHandler = () => {
    navigation.replace(AppScreen.ONBOARDING);
  };

  return (
    <ScreenTemplate>
      <View style={styles.screenContainer}>
        {termsContent ? (
          <>
            <Animated.View entering={FadeIn.delay(500)}>
              <LogoWithText style={styles.logo} />
            </Animated.View>
            <Animated.View entering={FadeIn.delay(500)} style={styles.content}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <RenderHtml contentWidth={width} source={termsContent} tagsStyles={styles} />
              </ScrollView>
            </Animated.View>
            <Animated.View entering={FadeIn.delay(500)}>
              <AppButton onPress={acceptOnPressHandler}>PRIHVATI USLOVE KORIŠĆENJA</AppButton>
            </Animated.View>
          </>
        ) : (
          <LoadingIndicator />
        )}
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
