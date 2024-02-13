import { Platform } from 'react-native';
import * as Network from 'expo-network';
import messageService from './message.service';
import { EventType } from 'src/services/tracking/tracking.interfaces';
import trackingService from 'src/services/tracking/tracking.service';
import { getBatteryLevelAsync } from 'expo-battery';
import { Contact, DeviceLocation } from '@/shared/types/model';

export const sendEmergencyRequest = async (
  contacts: Contact[],
  location: DeviceLocation | undefined,
  fullName: string
) => {
  if (location === undefined) {
    return;
  }

  const { type, isConnected, isInternetReachable } = await Network.getNetworkStateAsync();
  const batteryLevel = await getBatteryLevelAsync();
  const recipients = contacts.map((c) => c.number);

  sendSMS(fullName, recipients, location).then(() => {
    trackingService.track({
      name: EventType.EmergencyRequested,
      batteryPercentage: batteryLevel,
      deviceId: fullName,
      hasSignal: isInternetReachable,
      internetConnection: type,
      locationPrecision: location.accuracy || 'nepoznato',
      locationTimestamp: location.timestamp,
      location: {
        lon: location.longitude,
        lat: location.latitude,
      },
      recipients,
    });
  });
};

const sendSMS = async (username: string, recipients: string[], location: DeviceLocation) => {
  const { type, isConnected, isInternetReachable } = await Network.getNetworkStateAsync();

  const isTest = true;

  let message = `${username}: "Siguran Sam"
	Lokacija: https://maps.google.com/?q=${location.latitude},${location.longitude}
	Pozovite O.T.I.S: +3816102306685`;

  if (isTest) {
    messageService.sendNativeSMS(
      Platform.OS === 'ios' ? recipients : recipients.join(', '),
      message
    );
    return;
  }

  if (isInternetReachable) {
    messageService.sendOnlineSMS(recipients, message);
  } else {
    messageService.sendNativeSMS(
      Platform.OS === 'ios' ? recipients : recipients.join(', '),
      message
    );
  }
};

export default sendSMS;
