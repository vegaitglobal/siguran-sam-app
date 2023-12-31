import { View } from 'react-native';
import { AppButton } from '../buttons';
import { styles } from './contact-list-widget.style';
import { ContactList } from '../contacts-list';
import { ContactInput, PhoneNumber } from '../contact-input';
import React, { useState, useMemo } from 'react';
import {
	ContactsFullError,
	DuplicateContactError,
	addContact,
	useContactStore,
	deleteContact,
	LastContactDeletionError,
} from '@/shared/store/use-contact-store';

const PHONE_NUMBER_REGEXP =
	/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const ContactListWidget = () => {
	const { contacts } = useContactStore();

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

	const handleDeleteListItem = (number: string) => {
		try {
			deleteContact(number);
		} catch (err) {
			if (err instanceof LastContactDeletionError) {
				alert('Neophodno je da postoji bar jedan sigurnosni kontakt');
			} else {
				alert('¯\\_(ツ)_/¯');
			}
		}
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
			{/* <View style={styles.importButton}>
				<AppButton type='white' icon='add-user' onPress={handleImportContacts}>
					UVEZI IZ KONTAKATA
				</AppButton>
			</View> */}
		</View>
	);
};
