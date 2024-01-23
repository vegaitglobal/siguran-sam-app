import { create } from 'zustand';
import { DeviceLocation } from '../types';

type State = {
  location: DeviceLocation | undefined;
};

type Action = {
  updateDeviceLocation: (newLocation: DeviceLocation) => void;
};

export const useLocationStore = create<State & Action>((set) => ({
  location: undefined,
  updateDeviceLocation: (newLocation) => set(() => ({ location: newLocation })),
}));
