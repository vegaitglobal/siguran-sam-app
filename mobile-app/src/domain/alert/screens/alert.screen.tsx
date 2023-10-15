import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { Linking, AppState, View } from 'react-native';
import Label from '@/shared/components/label';
import sendSMS from '../services/sms-service';
import { Fragment, useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import { AppButton } from '@/shared/components';
import useLocation from '@/shared/hooks/use-location';
<<<<<<< HEAD
import getLocation from '../services/location-service';
=======
import CircleButton from '../components';
>>>>>>> main

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const AlertScreen = () => {
	const {
		location,
		isAllowed,
		setIsAllowed,
		city,
		country,
		street,
		streetNumber,
		setLocationProperties,
	} = useLocation();

	const [showHint, setShowHint] = useState(false);
	const appState = useRef(AppState.currentState);

	useEffect(() => {
		const subscription = AppState.addEventListener(
			'change',
			async (nextAppState) => {
				if (
					appState.current.match(/inactive|background/) &&
					nextAppState === 'active'
				) {
					let { status } = await Location.getForegroundPermissionsAsync();
					setIsAllowed(status === 'granted');
					setLocationProperties();
				}

				appState.current = nextAppState;
			}
		);

		return () => {
			subscription.remove();
		};
	}, [setLocationProperties]);

	const [latestLocation, setLatestLocation] =
		useState<Location.LocationObject | null>(null);
	const [shouldSendMessage, setShouldSendMessage] = useState(false);

	useEffect(() => {
		console.log(shouldSendMessage);
		console.log(latestLocation);
		if (
			shouldSendMessage &&
			latestLocation !== null &&
			latestLocation.coords?.latitude !== null &&
			latestLocation.coords?.longitude !== null &&
			latestLocation.coords?.latitude !== undefined &&
			latestLocation.coords?.longitude !== undefined
		) {
			sendSMS(latestLocation);
		}
	}, [latestLocation, shouldSendMessage]);

	return (
		<View style={styles.container}>
			{!isAllowed ? (
				<Fragment>
					<Label style={{ marginBottom: 16, textAlign: 'center' }}>
						Molim Vas, dozvolite pristup Vašoj lokaciji prilikom korišćenja
						aplikacije u podešavanjima. Bez dozvole pristupa, nećete moći
						precizno deliti svoje koordinate sa svojim kontaktima u slučaju
						opasnosti.
					</Label>
					<AppButton onPress={() => Linking.openSettings()}>
						PODEŠAVANJA
					</AppButton>
				</Fragment>
			) : (
				<Fragment>
<<<<<<< HEAD
					{showHint && <Label>Držite dugme 3 sekunde</Label>}
					<CircleButton
						text='SIGURAN SAM'
						onPress={async () => {
							setShouldSendMessage(false);
							setShowHint(true);
							setLatestLocation(await getLocation());
						}}
						onLongPress={() => {
							setShowHint(false);
							setShouldSendMessage(true);
						}}
=======
					<CircleButton
					// onPress={() => {
					// 	setShowHint(true);
					// }}
					// onLongPress={() => {
					// 	sendSMS();
					// 	setShowHint(false);
					// }}
>>>>>>> main
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
					<Label type='pItalic' style={{ marginTop: 12 }}>
						Vaša poslednja poznata lokacija
					</Label>
				</Fragment>
			)}
		</View>
	);
};

export default AlertScreen;
