import { useEffect, useMemo, useState } from 'react';
import { useOnboardingStore } from '../store';
import { useContactStore } from '@/shared/store/use-contact-store';

export const useHydrateStore = () => {
	const [onboardingHydrated, setOnboardingHydrated] = useState(
		useOnboardingStore.persist.hasHydrated
	);
	const [contactsHydrated, setContactsHydrated] = useState(
		useContactStore.persist.hasHydrated
	);

	const hydrated = useMemo(() => {
		return onboardingHydrated && contactsHydrated;
	}, [onboardingHydrated, contactsHydrated]);

	useEffect(() => {
		const unsubFinishOnboardingHydration =
			useOnboardingStore.persist.onFinishHydration(() =>
				setOnboardingHydrated(true)
			);
		const unsubFinishContactsHydration =
			useContactStore.persist.onFinishHydration(() =>
				setContactsHydrated(true)
			);

		setOnboardingHydrated(useOnboardingStore.persist.hasHydrated());
		setContactsHydrated(useContactStore.persist.hasHydrated());

		return () => {
			unsubFinishOnboardingHydration();
			unsubFinishContactsHydration();
		};
	}, []);

	return hydrated;
};
