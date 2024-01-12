import { View, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { styles } from './circle-button.style';
import Label from '@/shared/components/label';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/shared/styles';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import * as Haptics from 'expo-haptics';

interface Props {
  onCancel?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
  hint?: string;
  disabled?: boolean;
  minutes: number;
  delay: number;
}

const RADIUS = 110;
const LENGTH = 2 * RADIUS * Math.PI;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleButton = ({ onCancel, onComplete, hint, disabled, minutes, delay }: Props) => {
  const offset = useSharedValue(1);
  const hintOpacity = useSharedValue(0);
  const circleScale = useSharedValue(1);

  const timerRef = useRef<NodeJS.Timeout>();
  const hintTimeout = useRef<NodeJS.Timeout>();

  const setHintOpacity = useCallback(() => {
    if (!hint || disabled) return;
    if (hintTimeout.current) clearTimeout(hintTimeout.current);

    hintOpacity.value = withTiming(1);

    hintTimeout.current = setTimeout(() => {
      hintOpacity.value = withTiming(0);
    }, 5000);
  }, [hint, hintOpacity, disabled]);

  const startTimer = useCallback(() => {
    timerRef.current = setTimeout(() => {
      onComplete?.();
      circleScale.value = withSequence(
        withTiming(1.04, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, delay);
  }, [onComplete, circleScale, delay]);

  const clearTimer = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: -LENGTH * offset.value,
  }));

  const onPressInHandler = useCallback(() => {
    offset.value = withTiming(0, { duration: delay, easing: Easing.linear });
    startTimer();
  }, [offset, startTimer, delay]);

  const onPressOutHandler = useCallback(() => {
    offset.value = withSpring(1, { overshootClamping: true, mass: 0.25 });
    onCancel?.();
    setHintOpacity();
    clearTimer();
  }, [offset, onCancel, setHintOpacity, clearTimer]);

  const animatedHintStyle = useAnimatedStyle(() => {
    return {
      opacity: hintOpacity.value,
    };
  });

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: circleScale.value }],
    };
  });

  const dynamicCircleColorStyle: ViewStyle = useMemo(() => {
    return {
      backgroundColor: disabled ? Colors.DISABLED.PRIMARY : Colors.RED.SECONDARY,
      borderColor: disabled ? Colors.DISABLED.SECONDARY : Colors.RED.PRIMARY,
    };
  }, [disabled]);

  const dynamicTextColorStyle: TextStyle = useMemo(() => {
    return {
      textAlign: 'center',
      color: disabled ? Colors.DISABLED.SECONDARY : Colors.WHITE.PRIMARY,
    };
  }, [disabled]);

  const AnimatedHint = useCallback(() => {
    return (
      <Animated.View style={[styles.hintContainer, animatedHintStyle]}>
        <Label numberOfLines={3} style={styles.hint}>
          {hint}
        </Label>
      </Animated.View>
    );
  }, [animatedHintStyle, hint]);

  const AnimatedOuterCircle = useCallback(() => {
    return (
      <Svg width={240} height={240} style={styles.svgProgress}>
        <AnimatedCircle
          cx={120}
          cy={120}
          r={RADIUS}
          stroke={Colors.RED.SECONDARY}
          fill={'transparent'}
          strokeWidth={5}
          strokeDasharray={LENGTH}
          animatedProps={animatedProps}
        />
      </Svg>
    );
  }, [animatedProps]);

  const DisabledLabel = useCallback(() => {
    return (
      <Label type='h3Black' style={dynamicTextColorStyle}>
        {disabled ? `Dostupno za\n${minutes} minuta` : 'SIGURAN SAM'}
      </Label>
    );
  }, [dynamicTextColorStyle, disabled, minutes]);

  const AnimatedButton = useCallback(() => {
    return (
      <Animated.View style={animatedCircleStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={onPressInHandler}
          onPressOut={onPressOutHandler}
          style={[styles.innerCircle, dynamicCircleColorStyle]}
          onLongPress={onComplete}
          delayLongPress={delay}
          disabled={disabled}
        >
          <DisabledLabel />
        </TouchableOpacity>
      </Animated.View>
    );
  }, [
    DisabledLabel,
    animatedCircleStyle,
    delay,
    disabled,
    dynamicCircleColorStyle,
    onComplete,
    onPressInHandler,
    onPressOutHandler,
  ]);

  return (
    <View style={styles.container}>
      <AnimatedHint />
      <AnimatedOuterCircle />
      <AnimatedButton />
    </View>
  );
};

export default memo(CircleButton);
