import Label from '@/shared/components/label';
import React, { memo, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = {
  hint: string | undefined;
  onHintShouldDissapear: () => void;
};

const Hint = ({ hint, onHintShouldDissapear }: Props) => {
  const hintTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!hint) return;

    clearTimeout(hintTimeout.current);

    hintTimeout.current = setTimeout(onHintShouldDissapear, 5000);

    return () => {
      clearTimeout(hintTimeout.current);
    };
  }, [hint, onHintShouldDissapear]);

  return (
    <View style={styles.container}>
      {hint ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Label numberOfLines={3} style={styles.hint}>
            {hint}
          </Label>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default memo(Hint);

const styles = StyleSheet.create({
  hint: { textAlign: 'center' },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 30,
    width: '100%',
  },
});
