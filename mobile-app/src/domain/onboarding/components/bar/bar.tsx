import { Colors } from '@/shared/styles';
import { memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

interface Props {
	isActive: boolean;
	expanded: boolean;
}

const Bar = ({ isActive, expanded }: Props) => {
	const colorOffset = useSharedValue(isActive ? 1 : 0);
	const widthOffset = useSharedValue(isActive ? 1 : 0);
	useEffect(() => {
		if (isActive) colorOffset.value = withTiming(1);
		else colorOffset.value = withTiming(0);

		if (expanded) widthOffset.value = withTiming(1);
		else widthOffset.value = withTiming(0);
	}, [colorOffset, isActive, expanded]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				colorOffset.value,
				[0, 1],
				[Colors.WHITE.PRIMARY, Colors.RED.PRIMARY]
			),
			width: interpolate(widthOffset.value, [0, 1], [20, 45]),
		};
	});

	return <Animated.View style={[styles.container, animatedStyle]} />;
};

export default memo(Bar);

const styles = StyleSheet.create({
	container: {
		height: 14,
		marginRight: 4,
		borderRadius: 10,
	},
});
