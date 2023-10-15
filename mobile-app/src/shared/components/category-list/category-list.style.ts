import { StyleSheet } from 'react-native';
import { Colors, ContentWidth } from '@/shared/styles';

export const styles = StyleSheet.create({
	wrapper: {
		width: ContentWidth,
	},
	list: {
		maxHeight: '100%',
	},
	item: {
		backgroundColor: 'rgb(114.95, 0.48, 0.48)',
		borderRadius: 13,
		width: 315,
		height: 115,
		paddingHorizontal: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	itemSeparator: {
		height: 10,
	},
	title: {
		fontSize: 16,
		color: Colors.WHITE.PRIMARY,
		fontWeight: '700',
	},
	description: {
		fontSize: 13,
		color: Colors.WHITE.SECONDARY,
		fontWeight: '500',
	},
});
