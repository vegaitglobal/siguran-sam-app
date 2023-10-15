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
import useLocation, { DeviceLocation } from '@/shared/hooks/use-location';
import CircleButton from '../components';
import Moment from 'react-moment';
import sendSMS from '../services/sms-service';
import moment from 'moment';
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

	const [hint, setHint] = useState<string>();
	const [commitment, setCommitment] = useState(false);
	const [cooldown, setCooldown] = useState<moment.Moment>(
		moment().subtract(1, 'minute')
	);

	const {
		permissionsGranted: locationPermissionsGranted,
		getHighPriorityLocation,
		getLowPriorityLocation,
	} = useLocation();

	useEffect(() => {
		getLowPriorityLocation().then((location) => {
			setContext((current) => {
				return { ...current, location };
			});
		});
	}, []);

	const onStart = async () => {
		setCommitment(false);
		getHighPriorityLocation().then((location) => {
			setContext((current) => {
				return { ...current, location };
			});
			if (!commitment) return;

			sendSMS(location).then(() => {
				setHint('Sigurnosni kontakti su obavešteni');
			});
		});
	};

	const onCancel = async () => {
		setCommitment(false);
		setHint('Držite dugme 3 sekunde');
	};

	const onComplete = async () => {
		setCommitment(true);
		setCooldown(moment().add(5, 'minutes'));
		setHint('Prikupljamo najažurnije informacije...');
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
						disabledUntil={cooldown}
					/>
					<Label style={{ marginBottom: 12, fontSize:20, fontWeight:'bold' }}>
						{city}, {country}
					</Label>
					<Label type='pItalic'>Poslednja zabeležena lokacija</Label>
					<Label type='pItalic'>
						je od{' '}
						<Moment element={Text} interval={600_000} locale='sr' fromNow>
							{locationTimestamp}
						</Moment>
					</Label >
					{accuracy && (
						<Label type='pItalic'>sa preciznošću od {accuracy}</Label>
					)}
				</Fragment>
			)}
		</View>
	);
};

export default AlertScreen;
