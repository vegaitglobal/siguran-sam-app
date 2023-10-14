import { View, Pressable } from 'react-native';
import { styles } from './circle-button.style';
import Label from '@/shared/components/label';

interface Props {
	text: string;
	onPress: () => void;
}

export default function CircleButton({ text, onPress }: Props) {
	return (
		<View style={styles.circleButtonContainer}>
			<Pressable
				onLongPress={onPress}
				delayLongPress={2000}
				style={styles.circleButton}
			>
				<Label type='h3Black'>{text}</Label>
			</Pressable>
		</View>
	);
}
