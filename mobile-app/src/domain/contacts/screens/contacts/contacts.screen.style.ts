import { Colors, Paddings } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.BLACK.PRIMARY,
		paddingHorizontal: Paddings.HORIZONTAL,
		paddingVertical: Paddings.VERTICAL,
	},
	content: {
		backgroundColor: Colors.WHITE.PRIMARY,
		width: '100%',
		flex: 1,
	},
});
