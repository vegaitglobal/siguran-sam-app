import { View } from 'react-native';
import { AppButton } from '../buttons';
import { styles } from './contact-list-widget.style';
import { ContactList } from '../contacts-list';
import { ContactInput, PhoneNumber } from '../contact-input';
import { Contact } from '@/shared/types';
import React, { useState, useMemo } from 'react';
import {
	ContactsFullError,
	DuplicateContactError,
	addContact,
	contactStore,
	deleteContact,
} from '@/shared/store/contactStore';

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

const PHONE_NUMBER_REGEXP =
	/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const ContactListWidget = () => {
	const contacts = contactStore().contacts;

	const [newPhoneNumber, setNewPhoneNumber] = useState<PhoneNumber>({
		mainNumberPart: '',
		callingNumber: '',
	});

	const handleNewContactChange = (number: PhoneNumber) => {
		setNewPhoneNumber(number);
	};

	const fullNumber = useMemo(
		() => `${newPhoneNumber.callingNumber}${newPhoneNumber.mainNumberPart}`,
		[newPhoneNumber]
	);

	const handleAddContact = () => {
		try {
			addContact({ number: fullNumber });
			setNewPhoneNumber({ mainNumberPart: '', callingNumber: '' });
		} catch (err) {
			if (err instanceof DuplicateContactError) {
				alert('Već postoji kontakt sa unetim brojem');
			} else if (err instanceof ContactsFullError) {
				alert('Uneli ste maksimalan broj kontakata');
			} else {
				alert('¯\\_(ツ)_/¯');
			}
		}
	};

	const handleImportContacts = () => {
		alert('Under construction');
	};

	const handleDeleteListItem = (number: string) => {
		deleteContact(number);
	};

	const isNumberValid = useMemo(
		() => fullNumber.match(PHONE_NUMBER_REGEXP),
		[fullNumber]
	);

	return (
		<View>
			<ContactList contacts={contacts} onDeleteItem={handleDeleteListItem} />
			<ContactInput onChange={handleNewContactChange} number={newPhoneNumber} />
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
