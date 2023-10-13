import { WithChildren } from '@/shared/types';
import { View } from 'react-native';
import { styles } from './screen-template.style';

interface Props extends WithChildren {}

export const ScreenTemplate = ({ children }: Props) => {
	return <View style={styles.container}>{children}</View>;
};
