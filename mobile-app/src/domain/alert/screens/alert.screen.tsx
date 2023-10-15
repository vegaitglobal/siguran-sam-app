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
import 'moment/locale/sr';

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
	const {
		permissionsGranted: locationPermissionsGranted,
		getHighPriorityLocation,
		getLowPriorityLocation,
	} = useLocation();

	useEffect(() => {
		getLowPriorityLocation().then((location) =>
			setContext((current) => {
				return { ...current, location };
			})
		);
	}, []);

	const onStart = async () => {
		getHighPriorityLocation().then((location) => {
			setContext((current) => {
				return { ...current, location };
			});
		});
	};

	const { locationTimestamp, accuracy, city, country } = useMemo(() => {
		const { accuracy, timestamp, city, country } = context.location;
		return {
			accuracy,
			locationTimestamp: timestamp,
			city,
			country,
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

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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
						disabled={isButtonDisabled}
						minutes={minutes}
					/>
					<Label type='pItalic'>Poslednja zabeležena lokacija</Label>
					<Label>
						je od{' '}
						<Moment element={Text} interval={600_000} locale='sr' fromNow>
							{locationTimestamp}
						</Moment>
					</Label>
					{accuracy && (
						<Label type='pItalic'>sa preciznošću od {accuracy}</Label>
					)}
					<Label style={{ marginTop: 12 }}>
						{city}, {country}
					</Label>
				</Fragment>
			)}
		</View>
	);
};

export default AlertScreen;
