import {
	useFonts,
	Roboto_700Bold,
	Roboto_900Black,
	Roboto_400Regular,
	Roboto_400Regular_Italic,
} from '@expo-google-fonts/roboto';
import { useMemo } from 'react';
import { useHydrateStore } from './use-hydrate-store';

/**
 *
 * @returns true when app finishes initializing
 */
export const useAppInit = () => {
	let [fontsLoaded, fontError] = useFonts({
		Roboto_700Bold,
		Roboto_900Black,
		Roboto_400Regular,
		Roboto_400Regular_Italic,
	});

	const storeHydrated = useHydrateStore();

	const fontsInitialized = useMemo(() => {
		return fontsLoaded || fontError;
	}, [fontError, fontsLoaded]);

	const appInitialized = useMemo(() => {
		return fontsInitialized && storeHydrated;
	}, [fontsInitialized, storeHydrated]);

	return appInitialized;
};
