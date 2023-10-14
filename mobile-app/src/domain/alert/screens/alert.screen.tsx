import CircleButton from '@/domain/alert/components/circle-button';
import { AppScreen } from '@/shared/constants';
import useLocation from '@/shared/hooks/use-location';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { Button, Linking, Platform, View } from 'react-native';
import Label from '@/shared/components/label';
import sendSMS from '../services/sms-service';
import { Fragment, useState } from 'react';
import * as Location from 'expo-location';
import getLocation from '../services/location-service';
import { AppButton } from '@/shared/components';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const AlertScreen = () => {
	const [userDidPressButton, setUserDidPressButton] = useState(false);
	const {
		location,
		isLoading,
		isAllowed,
		city,
		country,
		street,
		streetNumber,
		altitude,
		accuracy,
		setLocationProperties,
		resetState,
	} = useLocation();
	return (
		<View style={styles.container}>
			{!isAllowed ? (
				<Fragment>
					<View>
						<Label style={{ marginBottom: 16 }}>
							Molim Vas prihvatite permisije za lokaciju.
						</Label>
						<AppButton onPress={() => Linking.openSettings()}>
							PODEŠAVANJA
						</AppButton>
					</View>
				</Fragment>
			) : (
				<Fragment>
					{userDidPressButton && <Label>Držite dugme duže od 2 sekunde</Label>}
					<CircleButton
						text='SIGURAN SAM'
						onPress={() => {
							setUserDidPressButton(true);
						}}
						onLongPress={() => {
							sendSMS();
							setUserDidPressButton(false);
						}}
					/>
					<Label>
						{city}, {country}
					</Label>
					<Label type='pItalic'>
						{street}, {streetNumber}
					</Label>
					<Label type='pItalic'>
						{location?.coords.latitude}° N, {location?.coords.longitude}° E
					</Label>
					<Label type='pItalic'>Preciznost: {Math.round(accuracy)}m</Label>
					<Label type='pItalic'>
						Nadmorska visina: {altitude !== null ? Math.round(altitude) : 0}m
					</Label>
					<Label type='p2'>Vaša poslednja poznata lokacija</Label>
					<Button title='RESET' onPress={resetState} />
				</Fragment>
			)}
		</View>
	);
};

export default AlertScreen;
