import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import Icon, { IconName } from '../icon';
import { styles } from './app-button.style';
export type AppButtonType = 'red' | 'white' | 'gray';

interface Props extends PressableProps {
	type?: AppButtonType;
	icon?: IconName;
}

export const AppButton = ({
	type = 'red',
	children,
	icon,
	style,
	disabled,
	...props
}: Props) => {
	return (
		<Pressable
			style={[styles.button, styles[type], disabled && styles.disabled]}
			disabled={disabled}
			{...props}
		>
			{icon && <Icon name={icon} size={16} style={styles.icon} />}
			<Text style={[styles.content, styles[type], disabled && styles.disabled]}>
				{children as String}
			</Text>
		</Pressable>
	);
};
