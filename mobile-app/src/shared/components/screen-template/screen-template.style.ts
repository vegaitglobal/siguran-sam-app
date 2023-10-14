import { Colors, Paddings } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.BLACK.PRIMARY,
		paddingHorizontal: Paddings.HORIZONTAL,
		paddingVertical: Paddings.VERTICAL,
	},
});
