import NewRelic from 'newrelic-react-native-agent';

import {
	ApplicationEvent,
	TrackingService,
	EventType,
} from './tracking.interfaces';

class NewRelicTrackingService implements TrackingService {
	constructor(appToken: string) {
		NewRelic.startAgent(appToken, {});
	}

	public track(event: ApplicationEvent) {
		switch (event.name) {
			case (EventType.ApplicationOpened, EventType.OnboardingFinished):
				return NewRelic.recordCustomEvent(
					event.name,
					event.deviceId,
					new Map().set('deviceId', event.deviceId)
				);

			case (EventType.ContactAdded, EventType.ContactRemoved):
				return NewRelic.recordCustomEvent(
					event.name,
					event.deviceId,
					new Map()
						.set('deviceId', event.deviceId)
						.set('totalContacts', event.totalContacts)
				);

			case EventType.EmergencyRequested:
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

export default (appToken: string) => new NewRelicTrackingService(appToken);
