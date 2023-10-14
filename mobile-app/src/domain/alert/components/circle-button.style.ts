import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	circleButtonContainer: {
		width: 160,
		height: 160,
		marginHorizontal: 60,
		borderWidth: 4,
		borderColor: '#f00',
		borderRadius: 80,
		padding: 3,
	},
	circleButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 80,
		backgroundColor: '#fff',
	},
});
