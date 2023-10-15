import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Contact } from '../types';

interface ContactStoreState {
	contacts: Contact[];
}
export class DuplicateContactError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'Duplicate contact';
	}
}
export class ContactsFullError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'Emergency contacts full';
	}
}

const maxContacts = 3;

export const useContactStore = create<ContactStoreState>()(
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

export const getContacts = () => useContactStore.getState().contacts;

export const addContact = (contact: Contact): Contact[] => {
	if (getContacts().length == maxContacts) {
		throw new ContactsFullError(
			'Emergency contacts cannot exceed max capacity.'
		);
	}
	if (
		useContactStore.getState().contacts.find((c) => c.number === contact.number)
	) {
		throw new DuplicateContactError(
			'Contact with number: ' +
				contact.number +
				' and name ' +
				contact.name +
				' already exists.'
		);
	}

	useContactStore.setState((state) => ({
		contacts: [...state.contacts, contact],
	}));

	return getContacts();
};

export const deleteContact = (number: string): Contact[] => {
	useContactStore.setState((state) => ({
		contacts: state.contacts.filter((c) => number !== c.number),
	}));
	return getContacts();
};

export const deleteAllContacts = (): Contact[] => {
	useContactStore.setState(() => ({ contacts: [] }));
	return getContacts();
};
