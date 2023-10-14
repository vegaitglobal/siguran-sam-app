import { Colors, ContentWidth } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	wrapper: {
		width: ContentWidth,
		borderColor: 'white',
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 8,
		height: 47,
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 26,
		zIndex: 10,
	},
	inputContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	input: {
		paddingHorizontal: 10,
		height: '100%',
		color: 'white',
	},
});
