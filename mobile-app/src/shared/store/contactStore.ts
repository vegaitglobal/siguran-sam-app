import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Contact = {
	name: string;
	phoneNumber: string;
	id: string;
};
interface ContactStoreState {
	contacts: Contact[];
}
class DuplicateContactError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'Duplicate contact';
	}
}
class ContactsFullError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'Emergency contacts full';
	}
}

const maxContacts = 3;

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

export const getContacts = () => contactStore.getState().contacts;

export const addContact = (contact: Contact): Contact[] => {
	if (getContacts().length == maxContacts) {
		throw new ContactsFullError(
			'Emergency contacts cannot exceed max capacity.'
		);
	}
	if (contactStore.getState().contacts.includes(contact)) {
		throw new DuplicateContactError(
			'Contact with number: ' +
				contact.phoneNumber +
				' and name ' +
				contact.name +
				' already exists.'
		);
	}

	contactStore.setState((state) => ({
		contacts: [...state.contacts, contact],
	}));

	return getContacts();
};

export const deleteContact = (contact: Contact): Contact[] => {
	contactStore.setState((state) => ({
		contacts: state.contacts.filter(
			(c) => contact.phoneNumber !== c.phoneNumber
		),
	}));
	return getContacts();
};

export const deleteAllContacts = (): Contact[] => {
	contactStore.setState(() => ({ contacts: [] }));
	return getContacts();
};
