import { View, TouchableOpacity } from 'react-native';
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
import { memo, useCallback, useEffect, useRef } from 'react';

interface Props {
	onCancel?: () => void;
	onStart?: () => void;
	onComplete?: () => void;
	hint?: string;
}

const RADIUS = 110;
const LENGTH = 2 * RADIUS * Math.PI;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleButton = ({ onCancel, onStart, onComplete, hint }: Props) => {
	const offset = useSharedValue(1);
	const hintOpacity = useSharedValue(0);
	const circleScale = useSharedValue(1);

	const timerRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (!hint) return;

		hintOpacity.value = withTiming(1);

		const timeout = setTimeout(() => {
			hintOpacity.value = withTiming(0);
		}, 5000);

		return () => {
			clearTimeout(timeout);
		};
	}, [hint, hintOpacity]);

	const startTimer = useCallback(() => {
		timerRef.current = setTimeout(() => {
			onComplete?.();
			circleScale.value = withSequence(
				withTiming(1.04, { duration: 100 }),
				withTiming(1, { duration: 100 })
			);
		}, 3000);
	}, [onComplete, circleScale]);

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
		offset.value = withTiming(0, { duration: 3000, easing: Easing.linear });
		onStart?.();
		startTimer();
	}, [offset, onStart, startTimer]);

	const onPressOutHandler = useCallback(() => {
		offset.value = withSpring(1, { overshootClamping: true, mass: 0.1 });
		onCancel?.();
		clearTimer();
	}, [offset, onCancel, clearTimer]);

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

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.hintContainer, animatedHintStyle]}>
				<Label numberOfLines={3} style={styles.hint}>
					{hint}
				</Label>
			</Animated.View>

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
			<Animated.View style={animatedCircleStyle}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPressIn={onPressInHandler}
					onPressOut={onPressOutHandler}
					style={styles.outerCircle}
				>
					<View style={styles.circleButton}>
						<Label type='h3Black'>SIGURAN SAM</Label>
					</View>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

export default memo(CircleButton);
