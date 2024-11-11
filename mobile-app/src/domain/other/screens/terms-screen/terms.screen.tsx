import { ScreenTemplate } from '@/shared/components';
import { Header } from '@/shared/components/header';
import { Colors } from '@/shared/styles';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import RenderHtml, { HTMLSource } from 'react-native-render-html';
import { TermsAndConditions } from 'src/services/content/content.interfaces';
import contentService from 'src/services/content/content.service';

const TermsScreen = () => {
  const [termsContent, setTerms] = useState<HTMLSource>();

  const { width } = useWindowDimensions();

  // TODO check internet connectivity

  useEffect(() => {
    contentService.getTermsAndConditions().then((result: TermsAndConditions) => {
      setTerms({ html: result.content });
    });
  }, []);

  return (
    <ScreenTemplate>
      <Header title='Uslovi korišćenja' hideRightComponent />
      <View style={styles.screenContainer}>
        {termsContent ? (
          <Animated.View entering={FadeIn.delay(500)} style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <RenderHtml contentWidth={width} source={termsContent} tagsStyles={styles} />
            </ScrollView>
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

export default TermsScreen;

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

  body: {
    color: Colors.WHITE.PRIMARY,
  },
});
