import { WithChildren } from '@/shared/types';
import { View, ViewStyle } from 'react-native';
import { styles } from './screen-template.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';

interface Props extends WithChildren {
	safeAreaTop?: boolean;
	safeAreaBottom?: boolean;
}

export const ScreenTemplate = ({
	children,
	safeAreaTop = true,
	safeAreaBottom = true,
}: Props) => {
	const { top, bottom } = useSafeAreaInsets();

	const safeAreaStyle = useMemo(() => {
		const safeAreaPaddingStyle: ViewStyle = {};

		if (safeAreaTop) safeAreaPaddingStyle.paddingTop = top;

		if (safeAreaBottom) safeAreaPaddingStyle.paddingBottom = bottom || 12;

		return safeAreaPaddingStyle;
	}, [top, bottom, safeAreaTop, safeAreaBottom]);

	return <View style={[styles.container, safeAreaStyle]}>{children}</View>;
};
