import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { Linking, View, Text } from 'react-native';
import Label from '@/shared/components/label';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { AppButton } from '@/shared/components';
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

	const [minutes, setMinutes] = useState(0);
	const [hint, setHint] = useState<string>();

	const {
		permissionsGranted: locationPermissionsGranted,
		getHighPriorityLocation,
		getLowPriorityLocation,
	} = useLocation();

	useEffect(() => {
		const interval = setInterval(() => {
			setMinutes((old) => old - 1);
		}, 60_000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		getLowPriorityLocation().then((location) => {
			setContext((current) => {
				return { ...current, location };
			});
		});
	}, []);

	const onStart = async () => {
		setHint('Prikupljamo najažurnije informacije...');
	};

	const onCancel = async () => {
		if (minutes <= 0) setHint('Držite dugme 3 sekunde');
	};

	const onComplete = async () => {
		setMinutes(5);
		getHighPriorityLocation().then((location) => {
			setContext((current) => {
				return { ...current, location };
			});

			sendSMS(location).then(() => {
				setHint('Sigurnosni kontakti su obavešteni');
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

	const disabled = useMemo(() => minutes > 0, [minutes]);

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
						onStart={onStart}
						onCancel={onCancel}
						onComplete={onComplete}
						disabled={disabled}
						minutes={minutes}
					/>
					<Label style={{ marginBottom: 12, fontSize: 20, fontWeight: 'bold' }}>
						{city}, {country}
					</Label>
					<Label type='pItalic'>Poslednja zabeležena lokacija</Label>
					<Label type='pItalic'>
						je od{' '}
						<Moment element={Text} locale='sr' fromNow>
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
