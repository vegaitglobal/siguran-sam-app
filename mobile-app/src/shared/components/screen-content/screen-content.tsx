import { View, ViewProps } from 'react-native';
import { styles } from './screen-content.style';

export const ScreenContent = ({ children, ...props }: ViewProps) => {
	return (
		<View style={styles.wrapper} {...props}>
			{children}
		</View>
	);
};
