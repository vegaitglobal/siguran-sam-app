import CircleButton from '@/domain/alert/components/circle-button';
import { AppScreen } from '@/shared/constants';
import useLocation from '@/shared/hooks/use-location';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { Button, View } from 'react-native';
import Label from '@/shared/components/label';

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
		city,
		country,
		street,
		streetNumber,
		altitude,
		missRadiusInMeters,
		setLocationProperties,
		resetState,
	} = useLocation();
	return (
		<View style={styles.container}>
			<CircleButton text='SIGURAN SAM' onPress={setLocationProperties} />
			<Label type='pItalic'>
				{city}, {country}
			</Label>
			<Label type='pItalic'>
				{street}, {streetNumber}
			</Label>
			<Label type='pItalic'>
				{location?.coords.latitude}° N, {location?.coords.longitude}° E
			</Label>
			<Label type='pItalic'>
				Preciznost: {Math.round(missRadiusInMeters)}m
			</Label>
			<Label type='pItalic'>
				Nadmorska visina: {altitude !== null ? Math.round(altitude) : 0}m
			</Label>
			<Label type='pItalic'>Vaša poslednja poznata lokacija</Label>
			<Button title='RESET' onPress={resetState} />
		</View>
	);
};

export default AlertScreen;
