export enum EventType {
	OnboardingFinished = 'onboardingFinished',
	EmergencyRequested = 'emergencyRequested',
}

type TrackOnboardingFinished = {
	name: EventType.OnboardingFinished;
	deviceId: string;
	totalContacts: number;
};

type TrackEmergencyRequest = {
	name: EventType.EmergencyRequested;
	deviceId: string;
	location: { lon: number; lat: number };
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
