import { Colors, ContentWidth, Paddings } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	wrapper: {},
	messageInputWrapper: {
		backgroundColor: Colors.BLACK.SECONDARY,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginBottom: 8,
	},
	messageInput: {
		color: 'white',
		height: 130,
	},
	disabled: {
		color: Colors.WHITE.SECONDARY,
	},
	editableIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	editableIndicatorText: {
		color: Colors.GRAY.PRIMARY,
    fontStyle: 'italic',
    marginHorizontal: 5
	},
	divider: {
		borderBottomColor: Colors.GRAY.PRIMARY,
		borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    flex: 1,
  },
  saveButtonWrapper: {
    paddingTop: 35
  }
});
