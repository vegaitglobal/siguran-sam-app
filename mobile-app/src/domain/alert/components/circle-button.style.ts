import { Colors } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	circleButtonContainer: {
		width: 200,
		height: 200,
		marginHorizontal: 60,
		marginVertical: 24,
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
	circleButtonContainerDisabled: {
		borderColor: Colors.GRAY.PRIMARY,
	},
	circleButtonDisabled: {
		backgroundColor: Colors.GRAY.DISABLED,
	},
});
