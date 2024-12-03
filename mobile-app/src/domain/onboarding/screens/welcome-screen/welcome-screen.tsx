import { ScreenTemplate } from '@/shared/components';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import DefaultLogoWithoutText from '@/shared/assets/images/logo.svg';
import DefaultLogoOnlyText from '@/shared/assets/images/logo-text.svg';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { useEffect } from 'react';

import { setIsOnboardingDone, useContentStore } from '@/shared/store';
import { LoadingImage } from '@/shared/components/loading-image/loading-image';

export interface Props extends NativeStackScreenProps<RootStackParamList, AppScreen.WELCOME> {}

const WelcomeScreen = () => {
  const { logoWithoutText, logoTextOnly } = useContentStore();

  useEffect(() => {
    const timeout = setTimeout(setIsOnboardingDone, 3500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ScreenTemplate>
      <View style={styles.screenContainer}>
        <View style={styles.logoContainer}>
          <Animated.View entering={FadeInRight.delay(500).duration(750)}>
            {logoWithoutText ? (
              <LoadingImage
                imageUrl={logoWithoutText.url}
                isSVG={logoWithoutText.isSVG}
                width='100'
                height='100'
                viewBox='0 0 322 300'
              />
            ) : (
              <DefaultLogoWithoutText width='100' height='100' viewBox='0 0 322 300' />
            )}
          </Animated.View>
          <View style={styles.separator} />
          <Animated.View entering={FadeIn.delay(1500).duration(1000)}>
            {logoTextOnly ? (
              <LoadingImage
                imageUrl={logoTextOnly.url}
                isSVG={logoTextOnly.isSVG}
                width='120'
                height='60'
                viewBox='0 0 46 22'
              />
            ) : (
              <DefaultLogoOnlyText width='120' height='60' viewBox='0 0 46 22' />
            )}
          </Animated.View>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  separator: {
    width: 8,
  },
});
