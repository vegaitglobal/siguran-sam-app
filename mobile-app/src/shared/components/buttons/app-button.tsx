import { WithChildren } from '@/shared/types';
import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { styles } from './app-button.style';
import Icon, { IconName } from '../icon';
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
	...props
}: Props) => {
	return (
		<Pressable style={[styles.button, styles[type]]} {...props}>
			{icon && <Icon name={icon} size={16} style={styles.icon} />}
			<Text style={[styles.content, styles[type]]}>{children as String}</Text>
		</Pressable>
	);
};
