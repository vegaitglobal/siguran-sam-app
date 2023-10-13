import CircleButton from '@/shared/components/CircleButton';
import { AppScreen } from '@/shared/constants';
import useLocation from '@/shared/hooks/useLocation';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const AlertScreen = () => {
	const { location, isLoading, isAllowed } = useLocation();
	return (
		<View style={styles.container}>
			<CircleButton onPress={() => {}} />
			<Text>Lat: {location?.coords.latitude}</Text>
			<Text>Long: {location?.coords.longitude}</Text>
		</View>
	);
};

export default AlertScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
