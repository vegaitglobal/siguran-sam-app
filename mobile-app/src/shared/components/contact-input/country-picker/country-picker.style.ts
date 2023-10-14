import { Colors, ContentWidth } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	wrapper: {
		position: 'relative',
	},
	pickerButton: {
		width: 70,
		height: 46,
		borderRightColor: 'white',
		borderRightStyle: 'solid',
		borderRightWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	pickerText: {
		color: 'white',
		marginRight: 4,
	},
	pickerList: {
		width: ContentWidth,
		position: 'absolute',
		top: 52,
		left: 0,
		height: 188,
		borderColor: 'white',
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: Colors.BLACK.SECONDARY,
	},
	countryItem: {
		height: 47,
		paddingHorizontal: 15,
		justifyContent: 'center',
	},
	countryText: {
		color: 'white',
	},
	itemSeparator: {
		height: 1,
		backgroundColor: 'white',
	},
});
