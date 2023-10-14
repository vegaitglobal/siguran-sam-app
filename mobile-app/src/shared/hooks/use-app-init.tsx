import {
	useFonts,
	Roboto_700Bold,
	Roboto_900Black,
	Roboto_400Regular,
	Roboto_400Regular_Italic,
} from '@expo-google-fonts/roboto';
import { useMemo } from 'react';

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

	const appInitialized = useMemo(() => {
		return fontsLoaded || fontError;
	}, [fontError, fontsLoaded]);

	return appInitialized;
};
