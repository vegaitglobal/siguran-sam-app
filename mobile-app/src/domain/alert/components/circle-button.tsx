import { View, Pressable, StyleSheet, Text } from 'react-native';
import { styles } from './circle-button.style';
import Label from '@/shared/components/label';

interface Props {
	text: string;
	onPress: () => void;
}

export default function CircleButton({ text, onPress }: Props) {
	return (
		<View style={styles.circleButtonContainer}>
			<Pressable onPress={onPress} style={styles.circleButton}>
				<Label type='h3Black'>{text}</Label>
			</Pressable>
		</View>
	);
}
