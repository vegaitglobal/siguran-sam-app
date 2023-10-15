import { useNavigation } from '@react-navigation/native';
import { Pressable, PressableProps, Text, View } from 'react-native';
import Icon from '../icon';
import { styles } from './header.style';

interface Props {
	leftComponent?: JSX.Element;
	hideLeftComponent?: boolean;
	rightComponent?: JSX.Element;
	hideRightComponent?: boolean;
	title?: string;
}

const BackButton = (props: PressableProps) => {
	const { goBack } = useNavigation();

	return (
		<Pressable onPress={goBack} {...props}>
			<Icon name='arrow-back' color='white' pointerEvents='none' />
		</Pressable>
	);
};

const MoreOptions = (props: PressableProps) => {
	const handleMoreOptions = () => {
		alert('¯\\_(ツ)_/¯');
	};

	return (
		<Pressable onPress={handleMoreOptions} {...props}>
			<Icon name='hamburger' color='white' pointerEvents='none' />
		</Pressable>
	);
};

export const Header = ({
	title,
	leftComponent,
	rightComponent,
	hideLeftComponent,
	hideRightComponent,
}: Props) => {
	return (
		<View style={styles.wrapper}>
			<View>{!hideLeftComponent && (leftComponent || <BackButton />)}</View>
			<View>
				<Text style={styles.title}>{title}</Text>
			</View>
			<View>{!hideRightComponent && (rightComponent || <MoreOptions />)}</View>
		</View>
	);
};
