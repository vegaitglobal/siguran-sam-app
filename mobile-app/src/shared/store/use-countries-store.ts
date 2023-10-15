import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Country } from '../types';
import { COUNTRIES_DATA } from '@/domain/countries/data';

interface CountriesStoreState {
	countries: Country[];
}

export const useCountriesStore = create<CountriesStoreState>()(
	persist(
		(_set) => ({
			countries: COUNTRIES_DATA,
		}),
		{
			name: 'user-info-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
