import { Colors, Sizes } from '@/shared/styles';
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		width: Dimensions.get('window').width * 0.8,
		borderRadius: 10,
		height: 47,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	icon: {
		marginRight: 3,
	},
	content: {
		fontWeight: '700',
		fontSize: Sizes.S,
	},
	red: {
		backgroundColor: Colors.RED.PRIMARY,
		color: 'white',
	},
	white: {
		backgroundColor: Colors.WHITE.PRIMARY,
		color: Colors.GRAY.PRIMARY,
	},
	gray: {
		backgroundColor: Colors.GRAY.PRIMARY,
		color: 'white',
	},
});
