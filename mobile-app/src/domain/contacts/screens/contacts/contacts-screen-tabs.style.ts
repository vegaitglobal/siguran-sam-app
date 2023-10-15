import { Colors, ContentWidth, Paddings } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	wrapper: {
		width: ContentWidth,
		flex: 1,
		paddingTop: Paddings.VERTICAL,
	},
	routeWrapper: {
		paddingTop: 30,
	},
	routeLabel: {
		marginBottom: 8,
	},
	tabBarWrapper: {
		alignItems: 'center',
	},
	tabBar: {
		height: 42,
		backgroundColor: Colors.BLACK.SECONDARY,
		borderRadius: 24,
		width: ContentWidth * 0.8,
		flexDirection: 'row',
	},
	tabBarItem: {
		borderRadius: 24,
		color: Colors.WHITE.SECONDARY,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	tabBarItemText: {
		color: Colors.WHITE.SECONDARY,
		fontWeight: '700',
	},
	selected: {
		backgroundColor: Colors.RED.PRIMARY,
		color: 'white',
	},
});
