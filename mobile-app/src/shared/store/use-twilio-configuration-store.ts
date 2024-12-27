import AsyncStorage from '@react-native-async-storage/async-storage';
import { TwilioConfiguration } from 'src/services/content/content.interfaces';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TwilioStoreState = TwilioConfiguration;

export const useTwilioConfigurationStore = create<TwilioStoreState>()(
  persist((_set) => ({
    enabled: false,
    serverlessFunctionURL: ''
  }), {
    name: 'twilio-storage',
    storage: createJSONStorage(() => AsyncStorage),
  })
);

export const setTwilioStore = (data: TwilioStoreState) => useTwilioConfigurationStore.setState(data);