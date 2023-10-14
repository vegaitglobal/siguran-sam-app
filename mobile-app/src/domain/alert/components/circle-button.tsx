import {
	View,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';
import { styles } from './circle-button.style';
import Label from '@/shared/components/label';

interface Props {
	text: string;
	onPress: () => void;
	onLongPress: () => void;
}

export default function CircleButton({ text, onPress, onLongPress }: Props) {
	return (
		<TouchableOpacity
			style={styles.circleButtonContainer}
			// onPressIn={() => console.log('pressIn')}
			// onPressOut={() => console.log('pressOut')}
			onLongPress={onLongPress}
			onPress={onPress}
		>
			<View style={styles.circleButton}>
				<Label type='h3Black'>{text}</Label>
			</View>
		</TouchableOpacity>
	);
}
