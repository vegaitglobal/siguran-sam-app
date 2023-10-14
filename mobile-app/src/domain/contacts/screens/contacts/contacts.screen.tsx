import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { ContactListWidget, ScreenTemplate } from '@/shared/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Modal, Pressable, PressableProps, Text, View } from 'react-native';
import { styles } from './contacts.screen.style';
import { TabView } from './tab-view';
import * as Contacts from 'expo-contacts';
import {
	addContact,
	Contact,
	deleteAllContacts,
} from '@/shared/store/contactStore';
import { useEffect, useState } from 'react';
import ContactPickerScreen from '@/domain/contacts/screens/contacts/contact.picker.screen';

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
						phoneNumber: phoneNumber,
						id: contact.id,
					});
				}
			}
			return result;
		}, []);
	}

	const handleSave = () => {
		console.log('Saving. Selected contacts:');
		console.table(selectedContacts);
		//contacts.forEach((contact: Contact) => addContact(contact));
	};

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
			<TabView  />
			<ContactListWidget />
			<SaveButton onPress={handleSave}  />

			<ContactPickerScreen
				visible={isModalVisible}
				onClose={closeModal}
				contactsData={allContactsData}
				selectedContacts={selectedContacts}
				setSelectedContacts={setSelectedContacts}
			/>
		</ScreenTemplate>
	);
};

const SaveButton = (props: PressableProps) => {
	return (
		<Pressable style={styles.saveButton} {...props}>
			<Text style={styles.saveButtonText}>SAČUVAJ</Text>
		</Pressable>
	);
};

export default ContactsScreen;
