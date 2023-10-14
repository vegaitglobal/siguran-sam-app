type DeviceContext = {
	hasSignal: boolean;
	internetConnection: 'wifi' | 'cellular' | 'none';
	batteryPercentage: number;
};

type LocationContext = {
	longitude: number;
	latitude: number;
	altitude: number;
	//altitude!!
	//slanje linka za google maps?
	timestamp: string;
};

type Timestamp = {
	original: string;
	current: string;
};

type EmergencyContext = {
	device: DeviceContext;
	location: LocationContext;
};

export enum EventType {
	ApplicationOpened = 'application-opened',
	OnboardingFinished = 'onboarding-finished',
	ContactAdded = 'contact-added',
	ContactRemoved = 'contact-removed',
	EmergencyRequested = 'emergency-requested',
}

type BaseEventData = {
	deviceId: string;
	timestamp: Timestamp;
};

type TrackApplicationOpen = BaseEventData & {
	name: EventType.ApplicationOpened;
};

type TrackOnboardingFinished = BaseEventData & {
	name: EventType.OnboardingFinished;
};

type TrackContactChanged = BaseEventData & {
	name: EventType.ContactAdded | EventType.ContactRemoved;
	totalContacts: number;
};

type TrackEmergencyRequest = BaseEventData & {
	name: EventType.EmergencyRequested;
	recipients: string[];
	delayedFrom?: string;
	context: EmergencyContext;
};

export type ApplicationEvent =
	| TrackApplicationOpen
	| TrackOnboardingFinished
	| TrackContactChanged
	| TrackEmergencyRequest;

export interface TrackingService {
	track: (event: ApplicationEvent) => void;
}
