import CircleButton from '@/domain/alert/components/circle-button';
import { AppScreen } from '@/shared/constants';
import useLocation from '@/shared/hooks/useLocation';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './alert.screen.style';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const AlertScreen = () => {
	const { location, isLoading, isAllowed, getLocation, setGetLocation } =
		useLocation();
	return (
		<View style={styles.container}>
			<CircleButton
				text='SIGURAN SAM'
				onPress={() => setGetLocation(!getLocation)}
			/>
			<Text>Grad, Država</Text>
			<Text>Lat: {location?.coords.latitude}</Text>
			<Text>Long: {location?.coords.longitude}</Text>
			<Text>Vaša poslednja poznata lokacija</Text>
		</View>
	);
};

export default AlertScreen;
