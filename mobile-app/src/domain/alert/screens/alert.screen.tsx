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
import useLocation from '@/shared/hooks/use-location';
import CircleButton from '../components';
import Moment from 'react-moment';
import sendSMS from '../services/sms-service';
import 'moment/locale/sr';
import { useUserInfoStore } from '@/shared/store';
import { useContactStore } from '@/shared/store/use-contact-store';
import trackingService from 'src/services/tracking/tracking.service';
import { EventType } from 'src/services/tracking/tracking.interfaces';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> { }

const AlertScreen = () => {
	const { fullName } = useUserInfoStore();
	const { contacts } = useContactStore();

	const [minutes, setMinutes] = useState(0);
	const [hint, setHint] = useState<string>();

	const {
		isPermissionGranted,
		location
	} = useLocation();

	useEffect(() => {
		const interval = setInterval(() => {
			setMinutes((old) => old - 1);
		}, 60_000);
		return () => clearInterval(interval);
	}, []);

	const onStart = async () => {
		setHint('Prikupljamo najažurnije informacije...');
	};

	const onCancel = async () => {
		if (minutes <= 0) setHint('Držite dugme 3 sekunde');
	};

	const onComplete = async () => {
		setMinutes(5);
		const recipients = contacts.map((c) => c.number);

		sendSMS(fullName, recipients, location).then(() => {
			trackingService.track({
				name: EventType.EmergencyRequested,
				batteryPercentage: 0.65,
				deviceId: fullName,
				hasSignal: true,
				internetConnection: 'wifi',
				locationPrecision: location.accuracy || 'nepoznato',
				locationTimestamp: location.timestamp,
				location: {
					lon: location.longitude,
					lat: location.latitude,
				},
				recipients,
			});
			setHint('Sigurnosni kontakti su obavešteni');
		});
	};

	const disabled = useMemo(() => minutes > 0, [minutes]);

	return (
		<View style={styles.container}>
			{!isPermissionGranted ? (
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
						onStart={onStart}
						onCancel={onCancel}
						onComplete={onComplete}
						disabled={disabled}
						minutes={minutes}
					/>
					<Label style={{ marginBottom: 12, fontSize: 20, fontWeight: 'bold' }}>
						{location.city}, {location.country}
					</Label>
					<Label type='pItalic'>Poslednja zabeležena lokacija</Label>
					<Label type='pItalic'>
						je od{' '}
						<Moment element={Text} locale='sr' fromNow>
							{location.timestamp}
						</Moment>
					</Label>
					{location.accuracy && (
						<Label type='pItalic'>sa preciznošću od {location.accuracy}</Label>
					)}
				</Fragment>
			)}
		</View>
	);
};

export default AlertScreen;
