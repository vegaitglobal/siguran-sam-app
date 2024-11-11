import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OnboardingStoreState {
  isOnboardingDone: boolean;
}

export const useOnboardingStore = create<OnboardingStoreState>()(
  persist(
    (_set) => ({
      isOnboardingDone: false,
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const setIsOnboardingDone = () =>
  useOnboardingStore.setState(() => ({ isOnboardingDone: true }));

export const resetOnboarding = () =>
  useOnboardingStore.setState(() => ({ isOnboardingDone: false }));
