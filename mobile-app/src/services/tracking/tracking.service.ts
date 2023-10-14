import NewRelic from 'newrelic-react-native-agent';

import {
	ApplicationEvent,
	TrackingService,
	EventType,
} from './tracking.interfaces';

class NewRelicTrackingService implements TrackingService {
	constructor(appKey: string) {
		// TODO: Check if we need to run agent to send custom events?
		NewRelic.startAgent(appKey, {});
	}

	public track(event: ApplicationEvent) {
		switch (event.name) {
			case EventType.ApplicationOpened:
			case EventType.OnboardingFinished: {
				const attributes = new Map().set('deviceId', event.deviceId);

				return NewRelic.recordCustomEvent(
					event.name,
					event.deviceId,
					attributes
				);
			}
			case EventType.ContactAdded:
			case EventType.ContactRemoved: {
				const attributes = new Map()
					.set('deviceId', event.deviceId)
					.set('totalContacts', event.totalContacts);

				return NewRelic.recordCustomEvent(
					event.name,
					event.deviceId,
					attributes
				);
			}
			case EventType.EmergencyRequested: {
				const attributes = new Map()
					.set('deviceId', event.deviceId)
					.set('batteryPercentage', event.context.device.batteryPercentage)
					.set('hasSignal', event.context.device.hasSignal)
					.set('longitude', event.context.location.longitude)
					.set('latitude', event.context.location.latitude)
					.set('altitude', event.context.location.altitude)
					.set('recipients', event.recipients.join('|'));

				if (event.delayedFrom) attributes.set('delayedFrom', event.delayedFrom);

				return NewRelic.recordCustomEvent(
					event.name,
					event.deviceId,
					attributes
				);
			}
		}
	}
}

const iOSAppKey = process.env.EXPO_PUBLIC_NEW_RELIC_IOS_KEY;
if (!iOSAppKey) throw Error('Newrelic iOS key is not configured');

const androidAppKey = process.env.EXPO_PUBLIC_NEW_RELIC_ANDROID_KEY;
if (!androidAppKey) throw Error('Newrelic Android key is not configured');

export default (platform: 'ios' | 'android') =>
	new NewRelicTrackingService(platform === 'ios' ? iOSAppKey : androidAppKey);
