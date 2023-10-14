import { Contact } from '@/shared/types';
import { FlatList, Text, View } from 'react-native';
import { styles } from './contact-list.style';
import Icon from '../icon';
import { Colors } from '@/shared/styles';

interface ContactListItemProps {
	contact: Contact;
	onDelete: () => void;
}

export const ContactListItem = ({
	contact: { name, number },
	onDelete,
}: ContactListItemProps) => {
	return (
		<View style={styles.item}>
			<View>
				{name && <Text style={styles.name}>{name}</Text>}
				<Text style={styles.number}>{number}</Text>
			</View>
			<Icon
				name='trash-can'
				color={Colors.GRAY.PRIMARY}
				size={16}
				onPress={onDelete}
			/>
		</View>
	);
};

const ItemSeparator = () => <View style={styles.itemSeparator} />;

interface Props {
	contacts: Contact[];
	onDeleteItem: (number: string) => void;
}

export const ContactList = ({ contacts, onDeleteItem }: Props) => {
	const handleDeleteItem = (number: string) => {
		onDeleteItem(number);
	};

	return (
		<View style={styles.wrapper}>
			<FlatList
				style={styles.list}
				data={contacts}
				renderItem={({ item }) => (
					<ContactListItem
						contact={item}
						onDelete={() => handleDeleteItem(item.number)}
					/>
				)}
				keyExtractor={({ number }) => number}
				ItemSeparatorComponent={() => <ItemSeparator />}
      />
      
		</View>
	);
};
