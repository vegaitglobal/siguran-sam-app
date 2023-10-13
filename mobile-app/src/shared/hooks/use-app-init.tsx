import {
	useFonts,
	Roboto_700Bold,
	Roboto_900Black,
	Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { useMemo } from 'react';

export const useAppInit = () => {
	let [fontsLoaded, fontError] = useFonts({
		Roboto_700Bold,
		Roboto_900Black,
		Roboto_400Regular,
	});

	const appInitialized = useMemo(() => {
		return fontsLoaded || fontError;
	}, [fontError, fontsLoaded]);

	return appInitialized;
};
