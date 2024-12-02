import { getPersonalizedMessage } from '@/shared/store/use-message-store';
import { Contact, DeviceLocation } from '@/shared/types/model';
import { getBatteryLevelAsync } from 'expo-battery';
import * as Network from 'expo-network';
import { EventType } from 'src/services/tracking/tracking.interfaces';
import trackingService from 'src/services/tracking/tracking.service';
import messageService from './message.service';

export const sendEmergencyMessage = async (
  messageTemplate: string,
  contacts: Contact[],
  location: DeviceLocation,
  fullName: string
) => {
  const { type, isInternetReachable } = await Network.getNetworkStateAsync();
  const batteryLevel = await getBatteryLevelAsync();
  const recipients = contacts.map((c) => c.number);

  sendSMS(messageTemplate, fullName, recipients, location).then(() => {
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

const sendSMS = async (
  messageTemplate: string,
  fullName: string,
  recipients: string[],
  location: DeviceLocation
) => {
  const { isInternetReachable } = await Network.getNetworkStateAsync();

  const isTest = true;

  const locationUrl = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

  const message = getPersonalizedMessage(messageTemplate, fullName, locationUrl);

  if (isTest) {
    messageService.sendNativeSMS(recipients, message);
    return;
  }

  if (isInternetReachable) {
    messageService.sendOnlineSMS(recipients, message);
  } else {
    messageService.sendNativeSMS(recipients, message);
  }
};

export default sendSMS;
