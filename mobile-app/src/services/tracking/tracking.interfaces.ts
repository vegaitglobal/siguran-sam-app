import { NetInfoStateType } from '@react-native-community/netinfo';
import { NetworkStateType } from 'expo-network';

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
  hasSignal: boolean | undefined;
  internetConnection: NetworkStateType | undefined;
  batteryPercentage: number;
  locationTimestamp: string;
  locationPrecision: string;
  recipients: string[];
};

export type ApplicationEvent = TrackOnboardingFinished | TrackEmergencyRequest;

export interface TrackingService {
  track: (event: ApplicationEvent) => void;
}
