import { Colors } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	tabBarStyle: {
		backgroundColor: Colors.BLACK.SECONDARY,
		borderTopWidth: 0,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	labelStyle: {
		fontSize: 10,
		fontFamily: 'Roboto_400Regular',
		marginBottom: 4,
	},
});
