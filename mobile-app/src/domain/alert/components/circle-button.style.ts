import { Colors } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		marginHorizontal: 60,
		marginVertical: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	innerCircle: {
		width: 200,
		height: 200,
		borderRadius: 100,
		borderWidth: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
	svgProgress: { position: 'absolute', transform: [{ rotateZ: '-90deg' }] },
	hint: { textAlign: 'center' },
	hintContainer: {
		position: 'absolute',
		top: -90,
	},
});
