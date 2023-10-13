import Label from '@/shared/components/label';
import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { styles } from './contacts.screen.style';
import { ScreenTemplate } from '@/shared/components';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const ContactsScreen = () => {
	return (
		<ScreenTemplate>
			<Label color='black'>Contacts</Label>
		</ScreenTemplate>
	);
};

export default ContactsScreen;
