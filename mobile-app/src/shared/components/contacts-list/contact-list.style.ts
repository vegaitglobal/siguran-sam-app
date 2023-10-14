import { Colors, ContentWidth, Paddings, Sizes } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	wrapper: {
		width: ContentWidth,
	},
	list: {
		maxHeight: 280,
	},
	item: {
		backgroundColor: Colors.BLACK.SECONDARY,
		borderRadius: 8,
		height: 47,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	itemSeparator: {
		height: 10,
	},
	name: {
		color: Colors.GRAY.PRIMARY,
		fontWeight: '700',
	},
	number: {
		color: Colors.GRAY.PRIMARY,
	},
	delete: {
		color: Colors.GRAY.PRIMARY,
	},
});
