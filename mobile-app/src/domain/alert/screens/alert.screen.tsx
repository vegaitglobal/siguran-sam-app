import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { View, Text, ActivityIndicator } from 'react-native';
import Label from '@/shared/components/label';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import useLocation from '@/domain/alert/hooks/use-location';
import CircleButton from '../components/circle-button';
import Moment from 'react-moment';
import 'moment/locale/sr';
import { useUserInfoStore } from '@/shared/store';
import { useContactStore } from '@/shared/store/use-contact-store';
import { sendEmergencyRequest } from '../services/sms-service';
import LocationPermissionDenied from '../components/location-permission-denied';

export interface Props
  extends CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
    NativeStackScreenProps<RootStackParamList>
  > {}

const AlertScreen = () => {
  const { fullName } = useUserInfoStore();
  const { contacts } = useContactStore();

  const [minutes, setMinutes] = useState(0);
  const [hint, setHint] = useState<string>();

  const { isPermissionGranted, location } = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes((old) => old - 1);
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const onCancel = useCallback(async () => {
    if (minutes <= 0) setHint('Držite dugme 2 sekunde');
  }, [minutes]);

  const onComplete = useCallback(async () => {
    sendEmergencyRequest(contacts, location, fullName);
    setMinutes(5);
    setHint('Sigurnosni kontakti su obavešteni');
  }, [contacts, fullName, location]);

  const disabled = useMemo(() => minutes > 0, [minutes]);

  const { locationTimestamp, accuracy, city, country } = useMemo(() => {
    if (location === undefined) {
      return {};
    }
    const { accuracy, timestamp, city, country } = location;
    return {
      accuracy,
      locationTimestamp: timestamp,
      city,
      country,
    };
  }, [location]);

  const LocationPermissionGrantedScreen = useCallback(() => {
    return (
      <Fragment>
        <CircleButton
          hint={hint}
          onCancel={onCancel}
          onComplete={onComplete}
          disabled={disabled}
          minutes={5}
          delay={2000}
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
        {accuracy && <Label type='pItalic'>sa preciznošću od {accuracy}</Label>}
      </Fragment>
    );
  }, [accuracy, city, country, locationTimestamp, disabled, hint, onComplete, onCancel]);

  const LocationLoadingScreen = useCallback(() => {
    return (
      <Fragment>
        <Label style={{ marginBottom: 16, textAlign: 'center' }}>
          Pronalaženje Vaše lokacije...
        </Label>
        <ActivityIndicator size='large' color={'#fff'} />
      </Fragment>
    );
  }, []);

  return (
    <View style={styles.container}>
      {isPermissionGranted ? (
        location === undefined ? (
          <LocationLoadingScreen />
        ) : (
          <LocationPermissionGrantedScreen />
        )
      ) : (
        <LocationPermissionDenied />
      )}
    </View>
  );
};

export default AlertScreen;
