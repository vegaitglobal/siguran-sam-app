import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserInfoStoreState {
	fullName: string;
}

export const useUserInfoStore = create<UserInfoStoreState>()(
	persist(
		(_set) => ({
			fullName: '',
		}),
		{
			name: 'user-info-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

export const setFullName = (fullName: string) =>
	useUserInfoStore.setState({ fullName });
