import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserInfoStoreState {
	name: string;
}

export const useUserInfoStore = create<UserInfoStoreState>()(
	persist(
		(_set) => ({
			name: '',
		}),
		{
			name: 'user-info-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

export const setName = () =>
	useUserInfoStore.setState((name: string) => ({ name }));
