import { View, Pressable, StyleSheet, Text } from 'react-native';
import { styles } from './circle-button.style';

interface Props {
	text: string;
	onPress: () => void;
}

export default function CircleButton({ text, onPress }: Props) {
	return (
		<View style={styles.circleButtonContainer}>
			<Pressable onPress={onPress} style={styles.circleButton}>
				<Text>{text}</Text>
			</Pressable>
		</View>
	);
}
