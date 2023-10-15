import { Colors, Paddings, Sizes } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		padding: 25,
		flex: 1,
	},
	link: {
		flexDirection: 'row',
		justifyContent: 'space-between',
    marginVertical: 15,
    alignItems: 'center'
	},
	linkTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center'
	},
	linkTitle: {
		fontWeight: '700',
		color: 'white',
		marginLeft: 15,
	},
});
