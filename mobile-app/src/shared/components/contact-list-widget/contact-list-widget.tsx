import { View } from 'react-native';
import { AppButton } from '../buttons';
import { styles } from './contact-list-widget.style';
import { ContactList } from '../contacts-list';
import { ContactInput } from '../contact-input';
import { Contact } from '@/shared/types';
import React, { useState, useMemo } from 'react';

const dummyContacts: Contact[] = [
	{
		name: 'Pera',
		number: '+381 64 123 4561',
	},
	{
		number: '+381 64 123 4562',
	},
	{
		name: 'Žika',
		number: '+381 64 123 4563',
	},
	{
		number: '+381 64 123 4564',
	},
	{
		name: 'Vlada',
		number: '+381 64 123 4565',
	},
];

const MAX_CONTACTS_NUMBER = 5;

const PHONE_NUMBER_REGEXP = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const ContactListWidget = () => {
	const [contacts, setContacts] = useState(dummyContacts);
	const [newContact, setNewContact] = useState('');

	const handleAddContact = () => {
		setContacts((prev) => [...prev, { number: newContact }]);
		// TODO persist
	};

	const handleImportContacts = () => {
		alert('Under construction');
	};

	const handleDeleteListItem = (number: string) => {
		setContacts((prev) => prev.filter((c) => c.number != number));
		// TODO persist
	};

	const isNumberValid = useMemo(
		() => newContact.match(PHONE_NUMBER_REGEXP),
		[newContact]
	);

	return (
		<View>
			<ContactList contacts={contacts} onDeleteItem={handleDeleteListItem} />
			<ContactInput onChange={setNewContact} />
			<View style={styles.addButton}>
				<AppButton onPress={handleAddContact} disabled={!isNumberValid}>
					+ DODAJ
				</AppButton>
			</View>
			<View style={styles.importButton}>
				<AppButton type='white' icon='add-user' onPress={handleImportContacts}>
					UVEZI IZ KONTAKATA
				</AppButton>
			</View>
		</View>
	);
};
