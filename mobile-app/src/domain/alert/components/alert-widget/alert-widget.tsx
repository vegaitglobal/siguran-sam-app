import Label from '@/shared/components/label';
import { DeviceLocation } from '@/shared/types';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import CircleButton from '../circle-button';
import Moment from 'react-moment';
import { sendEmergencyRequest } from '../../services/sms-service';
import { useUserInfoStore } from '@/shared/store';
import { useContactStore } from '@/shared/store/use-contact-store';
import Hint from '../hint';

type Props = {
  location: DeviceLocation | undefined;
};

const MAX_WAIT_MINUTES = 3;

const AlertWidget = ({ location }: Props) => {
  const { fullName } = useUserInfoStore();
  const { contacts } = useContactStore();

  const [minutes, setMinutes] = useState(0);
  const [hint, setHint] = useState<string>();

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes((old) => old - 1);
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const onCancel = useCallback(() => {
    if (minutes <= 0) setHint('Držite dugme 2 sekunde');
  }, [minutes]);

  const onComplete = useCallback(() => {
    sendEmergencyRequest(contacts, location, fullName);
    setMinutes(MAX_WAIT_MINUTES);
    setHint('Sigurnosni kontakti su obavešteni');
  }, [contacts, fullName, location]);

  const disabled = useMemo(() => minutes > 0, [minutes]);

  if (!location)
    return (
      <Fragment>
        <Label style={{ marginBottom: 16, textAlign: 'center' }}>
          Pronalaženje Vaše lokacije...
        </Label>
        <ActivityIndicator size='large' color={'#fff'} />
      </Fragment>
    );

  return (
    <Fragment>
      <Hint hint={hint} onHintShouldDissapear={() => setHint(undefined)} />
      <CircleButton
        onCancel={onCancel}
        onComplete={onComplete}
        disabled={disabled}
        minutes={minutes}
        delay={2000}
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
      {location.accuracy && <Label type='pItalic'>sa preciznošću od {location.accuracy}</Label>}
    </Fragment>
  );
};

export default AlertWidget;
