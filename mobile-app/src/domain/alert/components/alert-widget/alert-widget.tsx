import Label from '@/shared/components/label';
import { useUserInfoStore } from '@/shared/store';
import { useContactStore } from '@/shared/store/use-contact-store';
import { getPersonalizedMessage, useMessageStore } from '@/shared/store/use-message-store';
import { useTwilioConfigurationStore } from '@/shared/store/use-twilio-configuration-store';
import { DeviceLocation } from '@/shared/types';
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Moment from 'react-moment';
import { Alert, Text } from 'react-native';
import { TwilioConfiguration } from 'src/services/content/content.interfaces';
import { sendEmergencyMessage, trackEmergency } from '../../services/emergency';
import CircleButton from '../circle-button';
import Hint from '../hint';

type Props = {
  location: DeviceLocation;
};

const MAX_WAIT_MINUTES = 3;

enum WidgetState {
  SENDING,
  IDLE,
  DISABLED
}

const AlertWidget = ({ location }: Props) => {
  const { fullName } = useUserInfoStore();
  const { contacts } = useContactStore();
  const { message: template } = useMessageStore();
  const { enabled: twilioEnabled, serverlessFunctionURL } = useTwilioConfigurationStore();

  const [minutes, setMinutes] = useState(0);
  const [hint, setHint] = useState<string>();

  const clearHint = () => setHint(undefined);

  const [widgetState, setWidgetState] = useState(WidgetState.IDLE);

  const timerRef = useRef<NodeJS.Timeout>();

  const clearTimer = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    return clearTimer;
  }, []);

  const startTimer = useCallback(() => {
    setMinutes(MAX_WAIT_MINUTES);

    timerRef.current = setInterval(() => {
      setMinutes((old) => old - 1);
    }, 60_000);
  }, []);

  useEffect(() => {
    if (minutes > 0) {
      setWidgetState(WidgetState.DISABLED);
    } else {
      setWidgetState(WidgetState.IDLE);
      clearTimer();
    }
  }, [minutes]);

  const onCancel = useCallback(() => {
    if (widgetState == WidgetState.IDLE) {
      setHint('Držite dugme 2 sekunde');
    }
      
  }, [minutes, widgetState]);

  const onComplete = useCallback(() => {
    setWidgetState(WidgetState.SENDING);
    setHint('Slanje poruke...');

    const recipients = contacts.map((c) => c.number);

    const twilioData: TwilioConfiguration = {
      enabled: twilioEnabled,
      serverlessFunctionURL
    }

    const message = getPersonalizedMessage(template, fullName, location);

    sendEmergencyMessage(message, recipients, twilioData).then(result => {
      if (result != 'cancelled') {
        setWidgetState(WidgetState.DISABLED);
        startTimer();
        setHint('Sigurnosni kontakti su obavešteni');

        trackEmergency(fullName, location, recipients);
      } else {
        setWidgetState(WidgetState.IDLE);
        setHint('Slanje poruke prekinuto');
      }
    }).catch(err => {
      Alert.alert(err);

      setWidgetState(WidgetState.IDLE);
      clearHint();

      trackEmergency(fullName, location, recipients);
    })
  }, [contacts, fullName, location, template]);

  return (
    <Fragment>
      <Hint hint={hint} onHintShouldDissapear={clearHint} />
      <CircleButton
        onCancel={onCancel}
        onComplete={onComplete}
        disabled={widgetState == WidgetState.DISABLED}
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
