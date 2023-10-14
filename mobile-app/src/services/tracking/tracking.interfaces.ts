enum EventType {
	OnboardingFinished = 'onboardingFinished',
	EmergencyRequested = 'emergencyRequested',
}

type TrackOnboardingFinished = {
	name: EventType.OnboardingFinished;
	deviceId: string;
	totalContacts: number;
	timestamp: string;
};

type TrackEmergencyRequest = {
	name: EventType.EmergencyRequested;
	deviceId: string;
	location: { longitude: number; latitude: number };
	timestamp: string;
	hasSignal: boolean;
	internetConnection: 'wifi' | 'mobilni-podaci' | 'nema-interneta';
	batteryPercentage: number;
	locationTimestamp: string;
	locationPrecision: string;
	recipients: string[];
};

export type ApplicationEvent = TrackOnboardingFinished | TrackEmergencyRequest;

export interface TrackingService {
	track: (event: ApplicationEvent) => void;
}
