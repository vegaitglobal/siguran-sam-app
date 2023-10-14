import Label from '@/shared/components/label';
import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { AppButton, ScreenTemplate } from '@/shared/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, PressableProps, Text, View } from 'react-native';
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
			<TabView/>
			<View style={styles.addButton}>
				<AppButton onPress={handleAddContact}>+ DODAJ</AppButton>
			</View>
			<View style={styles.importButton}>
				<AppButton type='white' icon='add-user' onPress={handleImportContacts}>
					UVEZI IZ KONTAKATA
				</AppButton>
			</View>
			<SaveButton onPress={handleSave}/>
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
