import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { ContactListWidget, ScreenTemplate } from '@/shared/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, PressableProps, Text } from 'react-native';
import { styles } from './contacts.screen.style';
import { TabView } from './tab-view';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const ContactsScreen = () => {
	const handleAddContact = () => {
		alert('Hi');
	};

	const handleImportContacts = () => {
		alert('Hi');
	};

	const handleSave = () => {
		alert('Hi');
	};

	return (
		<ScreenTemplate>
			<TabView />
			<ContactListWidget />
			<SaveButton onPress={handleSave} />
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
