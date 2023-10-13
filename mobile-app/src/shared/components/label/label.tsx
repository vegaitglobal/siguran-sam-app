import { memo } from 'react';
import { TextStyle, Text, TextProps } from 'react-native';
import { styles } from './label.style';

export type TextType = keyof typeof styles;

interface Props extends TextProps {
	type?: TextType;
	color?: string;
}

const Label = ({
	type = 'p',
	color = 'white',
	style,
	children,
	...otherProps
}: Props) => {
	const colorStyle: TextStyle = {
		color,
	};

	return (
		<Text style={[styles[type], colorStyle, style]} {...otherProps}>
			{children}
		</Text>
	);
};

export default memo(Label);
