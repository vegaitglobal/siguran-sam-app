import { View, Pressable, StyleSheet, Text } from 'react-native';

export default function CircleButton({ text, onPress }) {
	return (
		<View style={styles.circleButtonContainer}>
			<Pressable onPress={onPress} style={styles.circleButton}>
				<Text>{text}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	circleButtonContainer: {
		width: 160,
		height: 160,
		marginHorizontal: 60,
		borderWidth: 4,
		borderColor: '#f00',
		borderRadius: 80,
		padding: 3,
	},
	circleButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 80,
		backgroundColor: '#fff',
	},
});
