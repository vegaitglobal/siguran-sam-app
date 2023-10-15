import Icon from '@/shared/components/icon';
import { Colors } from '@/shared/styles';
import { memo, useMemo } from 'react';
import {
	TouchableOpacity,
	TouchableOpacityProps,
	ViewStyle,
} from 'react-native';
import { styles } from './next-button.style';

interface Props extends TouchableOpacityProps {}

const NextButton = ({ disabled, style, ...otherProps }: Props) => {
	const dynamicStyles = useMemo(() => {
		const styles: ViewStyle = {
			backgroundColor: disabled ? 'transparent' : Colors.RED.PRIMARY,
			borderColor: disabled ? Colors.BLACK.SECONDARY : Colors.RED.PRIMARY,
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
				color={disabled ? Colors.BLACK.SECONDARY : Colors.WHITE.PRIMARY}
				name='arrow-big-right'
			/>
		</TouchableOpacity>
	);
};

export default memo(NextButton);
