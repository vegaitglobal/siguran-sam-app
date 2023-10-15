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
		borderColor: Colors.RED.PRIMARY,
		borderRadius: 100,
	},
	circleButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: Colors.RED.SECONDARY,
	},
	svgProgress: { position: 'absolute', transform: [{ rotateZ: '-90deg' }] },
	hint: { position: 'absolute', top: -90, textAlign: 'center' },
});
