import Icon from '@/shared/components/icon';
import { Colors } from '@/shared/styles';
import { memo, useMemo } from 'react';
import {
	TouchableOpacity,
	TouchableOpacityProps,
	ViewStyle,
} from 'react-native';
import { styles } from './back-button.style';

interface Props extends TouchableOpacityProps {}

const BackButton = ({ disabled, style, ...otherProps }: Props) => {
	const dynamicStyles = useMemo(() => {
		const styles: ViewStyle = {
			backgroundColor: disabled ? 'transparent' : Colors.GRAY_2.PRIMARY,
			borderColor: disabled ? Colors.BLACK.SECONDARY : Colors.GRAY_2.PRIMARY,
		};

		return styles;
	}, [disabled]);

	return (
		<TouchableOpacity
			disabled={disabled}
			style={[dynamicStyles, styles.buttonContainer, style]}
			{...otherProps}
		>
			<Icon
				pointerEvents='none'
				color={disabled ? Colors.BLACK.SECONDARY : Colors.GRAY_2.SECODNARY}
				name='arrow-big-left'
			/>
		</TouchableOpacity>
	);
};

export default memo(BackButton);
