import { StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';
import { styles as textStyles } from '../label';
import { Colors } from '@/shared/styles';
import { memo, useState } from 'react';
interface Props extends TextInputProps {}

const AppInput = ({ style, ...otherProps }: Props) => {
	const [focused, setFocused] = useState(false);

	const borderStyle: TextStyle = {
		borderColor: focused ? Colors.WHITE.PRIMARY : Colors.BLACK.SECONDARY,
	};
	return (
		<TextInput
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			placeholderTextColor={Colors.GRAY_2.SECODNARY}
			style={[styles.input, borderStyle, style]}
			{...otherProps}
		/>
	);
};

export default memo(AppInput);

const styles = StyleSheet.create({
	input: {
		...textStyles.p2,
		backgroundColor: Colors.BLACK.SECONDARY,
		paddingLeft: 12,
		height: 48,
		borderRadius: 8,
		color: 'white',
		borderWidth: 1,
	},
});
