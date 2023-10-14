type DeviceContext = {
	hasSignal: boolean;
	internetConnection: 'wifi' | 'cellular' | 'none';
	batteryPercentage: number;
};

type LocationContext = {
	longitude: number;
	latitude: number;
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

enum EventType {
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
	event: EventType.ApplicationOpened;
};

type TrackOnboardingFinished = BaseEventData & {
	event: EventType.OnboardingFinished;
};

type TrackContactChanged = BaseEventData & {
	event: EventType.ContactAdded | EventType.ContactRemoved;
	totalContacts: number;
	// TODO: Contact info -> country | number | etc?
};

type TrackEmergencyRequest = BaseEventData & {
	event: EventType.EmergencyRequested;
	totalContacts: number;
	context: EmergencyContext;
};

export type ApplicationEvent =
	| TrackApplicationOpen
	| TrackOnboardingFinished
	| TrackContactChanged
	| TrackEmergencyRequest;

export interface TrackingService {
	track: (event: ApplicationEvent) => Promise<void>;
}
