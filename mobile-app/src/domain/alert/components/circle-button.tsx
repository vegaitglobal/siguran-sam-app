import { View, TouchableOpacity } from 'react-native';
import { styles } from './circle-button.style';
import Label from '@/shared/components/label';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
	Easing,
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/shared/styles';
import { Fragment, memo, useCallback, useEffect } from 'react';

interface Props {
	onCancel?: () => void;
	onStart?: () => void;
	onComplete?: () => void;
	hint?: string;
	innerStyle: {};
	outerStyle: {};
	disabled: boolean;
	minutes: string;
}

const RADIUS = 110;
const LENGTH = 2 * RADIUS * Math.PI;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleButton = ({
	onCancel,
	onStart,
	onComplete,
	hint,
	innerStyle,
	outerStyle,
	disabled,
	minutes,
}: Props) => {
	const offset = useSharedValue(1);
	const hintOpacity = useSharedValue(0);

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

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: -LENGTH * offset.value,
	}));

	const onPressInHandler = useCallback(() => {
		offset.value = withTiming(0, { duration: 3000, easing: Easing.linear });
		onStart?.();
	}, [offset, onStart]);

	const onPressOutHandler = useCallback(() => {
		offset.value = withSpring(1, { overshootClamping: true });
		onCancel?.();
	}, [offset, onCancel]);

	const animatedHintStyle = useAnimatedStyle(() => {
		return {
			opacity: hintOpacity.value,
		};
	});

	return (
		<View style={styles.container}>
			<Animated.View style={animatedHintStyle}>
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
			<TouchableOpacity
				activeOpacity={0.8}
				onPressIn={onPressInHandler}
				onPressOut={onPressOutHandler}
				style={[styles.outerCircle, outerStyle]}
				onLongPress={onComplete}
				delayLongPress={3000}
				disabled={disabled}
			>
				<View style={[styles.innerCircle, innerStyle]}>
					{disabled ? (
						<Fragment>
							<Label type='p2'>Dugme ponovo dostupno za:</Label>
							<Label>{minutes}min</Label>
						</Fragment>
					) : (
						<Label type='h3Black'>SIGURAN SAM</Label>
					)}
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default memo(CircleButton);
