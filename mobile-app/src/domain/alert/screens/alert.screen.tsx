import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { Linking, View, Text } from 'react-native';
import Label from '@/shared/components/label';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { AppButton } from '@/shared/components';
import { Colors } from '@/shared/styles';
import useLocation, { DeviceLocation } from '@/shared/hooks/use-location';
import CircleButton from '../components';
import Moment from 'react-moment';
import sendSMS from '../services/sms-service';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const AlertScreen = () => {
	const [context, setContext] = useState<{ location: DeviceLocation }>({
		location: {} as DeviceLocation,
	});

	const [hint, setHint] = useState('');
	const { permissionsGranted: locationPermissionsGranted, getLocation } =
		useLocation();

	const onStart = async () => {
		getLocation().then((location) => {
			setContext((current) => {
				return { ...current, location };
			});
			console.log('location', location);
		});
	};

	const { locationTimestamp, accuracy } = useMemo(() => {
		const { accuracy, timestamp } = context.location;
		return {
			accuracy,
			locationTimestamp: timestamp,
		};
	}, [context.location]);

	const [shouldSendMessage, setShouldSendMessage] = useState(false);

	useEffect(() => {
		if (
			shouldSendMessage &&
			context !== null &&
			context.location.latitude !== undefined &&
			context.location.longitude !== undefined
		) {
			sendSMS(context.location);
		}
	}, [context, shouldSendMessage]);

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
			{!locationPermissionsGranted ? (
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
							onStart();
							setHint('Držite dugme 3 sekunde');
							setShouldSendMessage(false);
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
					<Label type='pItalic'>
						Poslednja zabeležena lokacija je od pre{' '}
						<Moment element={Text} interval={600_000} ago>
							{locationTimestamp}
						</Moment>
					</Label>
					{accuracy && (
						<Label type='pItalic'>sa preciznošću od {accuracy}</Label>
					)}
				</Fragment>
			)}
		</View>
	);
};

export default AlertScreen;
