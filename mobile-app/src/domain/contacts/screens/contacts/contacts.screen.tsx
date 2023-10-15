import { AppScreen } from '@/shared/constants';
import {
	BottomTabsParamList,
	Contact,
	RootStackParamList,
} from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import ContactPickerScreen from '@/domain/contacts/screens/contacts/contact.picker.screen';
import { ScreenTemplate } from '@/shared/components';
import { Header } from '@/shared/components/header';
import { ScreenContent } from '@/shared/components/screen-content';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { ContactsScreenTabs } from './contacts-screen-tabs';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const ContactsScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [allContactsData, setAllContactsData] = useState<Contact[]>([]);
	const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

	const handleAddContact = () => {
		alert('Hi');
	};

	const handleImportContacts = () => {
		(async () => {
			const { status } = await Contacts.requestPermissionsAsync();
			if (status === 'granted') {
				const { data } = await Contacts.getContactsAsync({
					fields: [
						Contacts.Fields.ID,
						Contacts.Fields.Name,
						Contacts.Fields.PhoneNumbers,
					],
				});

				if (data.length > 0) {
					setAllContactsData(expoContactsToSimpleContacts(data));
					setIsModalVisible(true);
				}
			}
		})();
	};

	// TODO: optimise
	function expoContactsToSimpleContacts(
		expoContacts: Contacts.Contact[]
	): Contact[] {
		const seenPhoneNumbers = new Set<string>();

		return expoContacts.reduce((result: Contact[], contact) => {
			if (contact.name && contact.phoneNumbers) {
				const phoneNumber = contact.phoneNumbers[0]?.number;
				if (phoneNumber && !seenPhoneNumbers.has(phoneNumber)) {
					seenPhoneNumbers.add(phoneNumber);
					result.push({
						name: contact.name,
						number: phoneNumber,
						id: contact.id,
					});
				}
			}
			return result;
		}, []);
	}

	const closeModal = () => {
		setIsModalVisible(false);
	};

	const saveSelectedContacts = (selectedContacts: Contact[]) => {
		//deleteAllContacts();
		//selectedContacts.forEach((contact: Contact) => addContact(contact));

		setIsModalVisible(false);
	};

	return (
		<ScreenTemplate>
			<Header title='Moji brojevi' />
			<ScreenContent>
				<ContactsScreenTabs />
				<ContactPickerScreen
					visible={isModalVisible}
					onClose={closeModal}
					contactsData={allContactsData}
					selectedContacts={selectedContacts}
					setSelectedContacts={setSelectedContacts}
				/>
			</ScreenContent>
		</ScreenTemplate>
	);
};

export default ContactsScreen;
