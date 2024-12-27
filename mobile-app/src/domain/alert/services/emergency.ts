import { DeviceLocation } from '@/shared/types/model';
import { getBatteryLevelAsync } from 'expo-battery';
import * as Network from 'expo-network';
import * as SMS from 'expo-sms';
import { TwilioConfiguration } from 'src/services/content/content.interfaces';
import { EventType } from 'src/services/tracking/tracking.interfaces';
import trackingService from 'src/services/tracking/tracking.service';
import MessageService from '../../../services/message/message.service';

export const sendEmergencyMessage = async (
  message: string,
  recipients: string[],
  { enabled: isTwilioEnabled, serverlessFunctionURL, }: TwilioConfiguration
): Promise<MessageResult> => {
  const { isInternetReachable } = await Network.getNetworkStateAsync();

  const shouldSendOnlineSMS = !!isInternetReachable && isTwilioEnabled;

  const isSMSAvailable = await SMS.isAvailableAsync();

  const messageService = new MessageService(serverlessFunctionURL);

  if (shouldSendOnlineSMS) {
    try {
      await messageService.sendOnlineSMS(recipients, message);

      return 'sent'
    } catch (error) {
      console.error('Error while sending messages via Twilio: ', error);
      console.log("Switching to native SMS")

      try {
        return await messageService.sendNativeSMS(recipients, message);

      } catch (error) {
        console.error('Error while sending messages via SMS: ', error);
        
        throw new Error("Dogodila se greška prilikom slanja poruke. Pokušajte ponovo.")
      }
    }
  } else if (isSMSAvailable) {
    try {
      return await messageService.sendNativeSMS(recipients, message);

    } catch (error) {
      console.error('Error while sending messages via SMS: ', error);
      
      throw new Error("Dogodila se greška prilikom slanja poruke. Pokušajte ponovo.")
    }
  } else {
    throw new Error("Slanje SMS-a nije omogućeno na ovom uređaju.")
  }
};

export const trackEmergency = async (fullName: string, location: DeviceLocation, recipients: string[]) => {
  const { type, isInternetReachable } = await Network.getNetworkStateAsync();
  const batteryLevel = await getBatteryLevelAsync();

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
  }).then(entry => {
    console.log('Emergency tracked: ', entry);
  }).catch(error => {
    console.error('Error while tracking emergency: ', error);
  });
}