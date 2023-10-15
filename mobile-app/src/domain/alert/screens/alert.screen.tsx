import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { Linking, View, Text } from 'react-native';
import Label from '@/shared/components/label';
import { Fragment, useMemo, useState } from 'react';
import { AppButton } from '@/shared/components';
import useLocation, { DeviceLocation } from '@/shared/hooks/use-location';
import CircleButton from '../components';
import Moment from 'react-moment';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const AlertScreen = () => {
	const [context, setContext] = useState<{ location: DeviceLocation }>({
		location: {} as DeviceLocation,
	});

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
						hint={''}
						onCancel={() => {}}
						onStart={onStart}
						onComplete={() => {}}
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
