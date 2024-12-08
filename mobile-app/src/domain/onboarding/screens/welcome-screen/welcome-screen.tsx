import { ScreenTemplate } from '@/shared/components';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Image } from 'react-native';
import DefaultLogoWithoutText from '@/shared/assets/images/logo.svg';
import DefaultLogoOnlyText from '@/shared/assets/images/logo-text.svg';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { useEffect } from 'react';

import { setIsOnboardingDone, useContentStore } from '@/shared/store';

export interface Props extends NativeStackScreenProps<RootStackParamList, AppScreen.WELCOME> {}

const WelcomeScreen = () => {
  const { logoAnimated } = useContentStore();

  useEffect(() => {
    const timeout = setTimeout(setIsOnboardingDone, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  console.log(logoAnimated);

  return (
    <ScreenTemplate>
      <View style={styles.screenContainer}>
        {logoAnimated ? (
          <Image source={{ uri: logoAnimated.url }} style={styles.logoImage} />
        ) : (
          <DefaultAnimatedLogo />
        )}
      </View>
    </ScreenTemplate>
  );
};

const DefaultAnimatedLogo = () => (
  <View style={styles.logoContainer}>
    <Animated.View entering={FadeInRight.delay(500).duration(750)}>
      <DefaultLogoWithoutText width='100' height='100' viewBox='0 0 322 300' />
    </Animated.View>
    <View style={styles.separator} />
    <Animated.View entering={FadeIn.delay(1500).duration(1000)}>
      <DefaultLogoOnlyText width='120' height='60' viewBox='0 0 46 22' />
    </Animated.View>
  </View>
);

export default WelcomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  separator: {
    width: 8,
  },
});
