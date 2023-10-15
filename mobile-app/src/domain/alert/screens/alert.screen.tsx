import CircleButton from '@/domain/alert/components/circle-button';
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
import getLocation from '../services/location-service';
import { Colors } from '@/shared/styles';

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

	const [hint, setHint] = useState('');
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

	const [innerColor, setInnerColor] = useState({
		backgroundColor: Colors.RED.SECONDARY,
		color: Colors.WHITE.PRIMARY,
	});

	const [outerColor, setOuterColor] = useState({
		borderColor: Colors.RED.PRIMARY,
	});

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	useEffect(() => {
		if (isButtonDisabled) {
			setInnerColor({
				backgroundColor: Colors.DISABLED.PRIMARY,
				color: Colors.DISABLED.SECONDARY,
			});
			setOuterColor({
				borderColor: Colors.DISABLED.SECONDARY,
			});
		} else {
			setInnerColor({
				backgroundColor: Colors.RED.SECONDARY,
				color: Colors.WHITE.PRIMARY,
			});
			setOuterColor({
				borderColor: Colors.RED.PRIMARY,
			});
		}
	}, [isButtonDisabled]);

	const [countDown, setCountDown] = useState(0);
	const [runTimer, setRunTimer] = useState(false);

	useEffect(() => {
		let timerId = setInterval(() => {}, 1000);

		if (runTimer) {
			setCountDown(60 * 5 - 1);
			timerId = setInterval(() => {
				setCountDown((countDown) => countDown - 1);
			}, 1000);
		} else {
			clearInterval(timerId);
		}

		return () => clearInterval(timerId);
	}, [runTimer]);

	useEffect(() => {
		if (countDown < 0 && runTimer) {
			setRunTimer(false);
			setCountDown(0);
			setIsButtonDisabled(false);
		}
	}, [countDown, runTimer]);

	const togglerTimer = () => setRunTimer((t) => !t);

	const minutes = String(Math.floor(countDown / 60) + 1).padStart(2);

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
					<CircleButton
						hint={hint}
						onStart={async () => {
							setHint('Držite dugme 3 sekunde');
							setShouldSendMessage(false);
							setLatestLocation(await getLocation());
						}}
						onCancel={() => {}}
						onComplete={() => {
							setHint('');
							setShouldSendMessage(true);
							setIsButtonDisabled(true);
							togglerTimer();
						}}
						innerStyle={innerColor}
						outerStyle={outerColor}
						disabled={isButtonDisabled}
						minutes={minutes}
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
