import { Colors } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		marginHorizontal: 60,
		marginVertical: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	outerCircle: {
		width: 200,
		height: 200,
		borderWidth: 7,
		borderRadius: 100,
	},
	innerCircle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
	},
	svgProgress: { position: 'absolute', transform: [{ rotateZ: '-90deg' }] },
	hint: { textAlign: 'center' },
	hintContainer: {
		position: 'absolute',
		top: -90,
	},
});
