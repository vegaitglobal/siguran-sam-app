import { useEffect, useMemo, useState } from 'react';
import { useOnboardingStore } from '../store';

export const useHydrateStore = () => {
	const [onboardingHydrated, setOnboardingHydrated] = useState(
		useOnboardingStore.persist.hasHydrated
	);

	const hydrated = useMemo(() => {
		return onboardingHydrated;
	}, [onboardingHydrated]);

	useEffect(() => {
		const usnubFinishOnboardingHydration =
			useOnboardingStore.persist.onFinishHydration(() =>
				setOnboardingHydrated(true)
			);

		setOnboardingHydrated(useOnboardingStore.persist.hasHydrated());

		return () => {
			usnubFinishOnboardingHydration();
		};
	}, []);

	return hydrated;
};
