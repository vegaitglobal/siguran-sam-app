import { Contact } from '@/shared/types';
import React from 'react';
import { Button, FlatList, Modal, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

interface ContactPickerProps {
	visible: boolean;
	onClose: () => void;
	contactsData: Contact[];
	selectedContacts: Contact[];
	setSelectedContacts: (contacts: Contact[]) => void;
}
export default function ContactPickerScreen(props: ContactPickerProps) {
	const toggleContactSelection = (contact: Contact) => {
		if (props.selectedContacts.includes(contact)) {
			props.setSelectedContacts(
				props.selectedContacts.filter((c) => c !== contact)
			);
		} else if (props.selectedContacts.length < 5) {
			props.setSelectedContacts([...props.selectedContacts, contact]);
		}
	};

	const cancelContactSelection = () => {
		props.setSelectedContacts([]);
		props.onClose();
	};

	const select = () => {
		console.log('selectetd');
		console.log(props.selectedContacts);
		props.onClose();
	};

	return (
		<Modal visible={props.visible} animationType='slide'>
			<View style={{ flex: 1, paddingTop: 20 }}>
				<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
					Choose up to 5 contacts:
				</Text>
				<FlatList
					data={props.contactsData}
					keyExtractor={(contact) => contact.number}
					renderItem={({ item: contact }) => (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginBottom: 10,
							}}
						>
							<CheckBox
								checked={props.selectedContacts.includes(contact)}
								onPress={() => toggleContactSelection(contact)}
							/>
							<Text>{contact.name}</Text>
						</View>
					)}
				/>
				<Button title='Select' onPress={select} />
				<Button title='Cancel' onPress={cancelContactSelection} />
			</View>
		</Modal>
	);
}
