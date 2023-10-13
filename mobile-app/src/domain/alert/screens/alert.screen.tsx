import CircleButton from '@/domain/alert/components/circle-button';
import { AppScreen } from '@/shared/constants';
import useLocation from '@/shared/hooks/useLocation';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { View, StyleSheet, Text } from 'react-native';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const AlertScreen = () => {
	const {
		location,
		isLoading,
		isAllowed,
		getLocation,
		setGetLocation,
		city,
		country,
		street,
		streetNumber,
	} = useLocation();
	return (
		<View style={styles.container}>
			<CircleButton
				text='SIGURAN SAM'
				onPress={() => setGetLocation(!getLocation)}
			/>
			<Text>
				{city}, {country}
			</Text>
			<Text>
				{street}, {streetNumber}
			</Text>
			<Text>
				{location?.coords.latitude}° N, {location?.coords.longitude}° E
			</Text>
			<Text>Vaša poslednja poznata lokacija</Text>
		</View>
	);
};

export default AlertScreen;
