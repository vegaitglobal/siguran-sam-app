import DefaultLogo from '@/shared/assets/images/logo-with-text.svg';
import { AppButton, ScreenTemplate } from '@/shared/components';
import { LoadingImage } from '@/shared/components/loading-image/loading-image';
import { AppScreen } from '@/shared/constants';
import { useContentStore } from '@/shared/store';
import { Colors } from '@/shared/styles';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import RenderHtml, { HTMLSource } from 'react-native-render-html';
import contentService from 'src/services/content/content.service';
import * as Network from 'expo-network';

interface Props extends NativeStackScreenProps<RootStackParamList, AppScreen.ONBOARDING_TERMS> { }

const OnboardingTermsScreen = ({ navigation }: Props) => {
  const [termsContent, setTerms] = useState<HTMLSource>();

  const { logo } = useContentStore();

  const { width } = useWindowDimensions();

  // TODO check internet connectivity

  // TODO think of moving this to root stack
  useEffect(() => {
    Network.getNetworkStateAsync().then((state) => {
      if (!state.isInternetReachable) {
        Alert.alert('Nema internet konekcije', 'Za inicijalno pokretanje aplikacije je potrebna internet konekcija. Proverite Vašu internet konekciju i pokušajte ponovo.');
        return;
      }

      contentService.getTermsAndConditions().then((result) => {
        if (result) {
          setTimeout(() => {
            setTerms({ html: result.content });
          }, 300);
        }
        else {
          Alert.alert('Greška', 'Došlo je do greške prilikom učitavanja aplikacije. Pokušajte ponovo kasnije.');
        }
      }).catch(() => {
        Alert.alert('Greška', 'Došlo je do greške prilikom učitavanja aplikacije. Pokušajte ponovo kasnije.');
      });
    });
  }, []);

  const acceptOnPressHandler = () => {
    navigation.replace(AppScreen.ONBOARDING);
  };

  return (
    <ScreenTemplate>
      <View style={styles.screenContainer}>
        {termsContent ? (
          <Animated.View style={styles.innerContainer} entering={FadeIn.delay(500)}>
            <View>
              {logo ? (
                <LoadingImage imageUrl={logo.url} isSVG={logo.isSVG} />
              ) : (
                <DefaultLogo style={styles.logo} />
              )}
            </View>
            <View style={styles.content}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <RenderHtml contentWidth={width} source={termsContent} tagsStyles={styles} />
              </ScrollView>
            </View>
            <View>
              <AppButton onPress={acceptOnPressHandler}>PRIHVATI USLOVE KORIŠĆENJA</AppButton>
            </View>
          </Animated.View>
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
  innerContainer: {
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
