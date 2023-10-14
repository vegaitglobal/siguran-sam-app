import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Contact = {
	name: string;
	phoneNumber: string;
};
interface ContactStoreState {
	contacts: Contact[];
}

export const contactStore = create<ContactStoreState>()(
	persist(
		(_set) => ({
			contacts: [],
		}),
		{
			name: 'contact-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

export const getContacts = () => contactStore.getState();

export const addContact = (contact: Contact) =>
	contactStore.setState((state) => ({
		contacts: [...state.contacts, contact],
	}));

export const deleteContact = (contact: Contact) =>
	contactStore.setState((state) => ({
		contacts: state.contacts.filter(
			(c) => contact.phoneNumber !== c.phoneNumber
		),
	}));

export const deleteAllContacts = () =>
	contactStore.setState(() => ({ contacts: [] }));
