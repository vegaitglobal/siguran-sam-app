import { View, TouchableOpacity } from 'react-native';
import { styles } from './circle-button.style';
import Label from '@/shared/components/label';
import { useState } from 'react';

interface Props {
	text: string;
	onPress: () => void;
	onLongPress: () => void;
}

export default function CircleButton({ text, onPress, onLongPress }: Props) {
	return (
		<TouchableOpacity
			style={styles.circleButtonContainer}
			onLongPress={onLongPress}
			delayLongPress={3000}
			onPressIn={onPress}
		>
			<View style={styles.circleButton}>
				<Label type='h3Black'>{text}</Label>
			</View>
		</TouchableOpacity>
	);
}
