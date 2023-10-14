import { useEffect, useMemo, useState } from 'react';
import { useOnboardingStore } from '../store';
import { contactStore } from '@/shared/store/contactStore';

export const useHydrateStore = () => {
	const [onboardingHydrated, setOnboardingHydrated] = useState(
		useOnboardingStore.persist.hasHydrated
	);
	const [contactsHydrated, setContactsHydrated] = useState(
		contactStore.persist.hasHydrated
	);

	const hydrated = useMemo(() => {
		return onboardingHydrated && contactsHydrated;
	}, [onboardingHydrated, contactsHydrated]);

	useEffect(() => {
		const unsubFinishOnboardingHydration =
			useOnboardingStore.persist.onFinishHydration(() =>
				setOnboardingHydrated(true)
			);
		const unsubFinishContactsHydration = contactStore.persist.onFinishHydration(
			() => setOnboardingHydrated(true)
		);

		setOnboardingHydrated(useOnboardingStore.persist.hasHydrated());
		setContactsHydrated(contactStore.persist.hasHydrated());

		return () => {
			unsubFinishOnboardingHydration();
			unsubFinishContactsHydration();
		};
	}, []);

	return hydrated;
};
