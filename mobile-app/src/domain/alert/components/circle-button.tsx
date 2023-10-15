import { View, TouchableOpacity } from 'react-native';
import { styles } from './circle-button.style';
import Label from '@/shared/components/label';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
	Easing,
	useAnimatedProps,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/shared/styles';

interface Props {
	text: string;
	onPress: () => void;
	onLongPress: () => void;
}

const radius = 110;
const length = 2 * radius * Math.PI;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircleButton({ text, onPress, onLongPress }: Props) {
	const offset = useSharedValue(1);

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: -length * offset.value,
	}));
	const onPressInHandler = () => {
		offset.value = withTiming(0, { duration: 3000, easing: Easing.linear });
	};

	const onPressOutHandler = () => {
		offset.value = withSpring(1, { overshootClamping: true });
	};

	return (
		<View style={styles.container}>
			<Svg width={240} height={240} style={styles.svgProgress}>
				<AnimatedCircle
					cx={120}
					cy={120}
					r={radius}
					stroke={Colors.RED.SECONDARY}
					fill={'transparent'}
					strokeWidth={5}
					strokeDasharray={length}
					animatedProps={animatedProps}
				/>
			</Svg>
			<TouchableOpacity
				activeOpacity={0.8}
				onPressIn={onPressInHandler}
				onPressOut={onPressOutHandler}
				style={styles.outerCircle}
				onLongPress={onLongPress}
				onPress={onPress}
			>
				<View style={styles.circleButton}>
					<Label type='h3Black'>{text}</Label>
				</View>
			</TouchableOpacity>
		</View>
	);
}
