import { View, Pressable, StyleSheet, Text } from 'react-native';
import { styles } from './CircleButton.style';

export default function CircleButton({ text, onPress }) {
	return (
		<View style={styles.circleButtonContainer}>
			<Pressable onPress={onPress} style={styles.circleButton}>
				<Text>{text}</Text>
			</Pressable>
		</View>
	);
}
