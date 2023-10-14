import {
	FlatList,
	Pressable,
	PressableProps,
	Text,
	TextInput,
	View,
} from 'react-native';
import { Country } from '@/shared/types';
import React, { useState } from 'react';
import { styles } from './country-picker.style';
import Icon from '../../icon';

export const countries: Country[] = [
	{
		name: 'Srbija',
		callingNumber: '+381',
		flag: '',
	},
	{
		name: 'Crna Gora',
		callingNumber: '+382',
		flag: '',
	},
	{
		name: 'Hrvatska',
		callingNumber: '+385',
		flag: '',
	},
	{
		name: 'Bosna i Hercegovina',
		callingNumber: '+387',
		flag: '',
	},
	{
		name: 'Test drzava 1',
		callingNumber: '+388',
		flag: '',
	},
	{
		name: 'Test drzava 2',
		callingNumber: '+389',
		flag: '',
	},
];

interface Props {
	onCountryChange: (country: Country) => void;
	selectedCountry: Country;
}

export const CountryPicker = ({ onCountryChange, selectedCountry }: Props) => {
	const [isPickerOpen, setIsPickerOpen] = useState(false);

	const togglePicker = () => setIsPickerOpen((val) => !val);

	const onCallingNumberChange = (country: Country) => {
		togglePicker();
		onCountryChange(country);
	};

	return (
		<View style={styles.wrapper}>
			<Pressable style={styles.pickerButton} onPress={togglePicker}>
				<Text style={styles.pickerText}>{selectedCountry.callingNumber}</Text>
				<Icon name='arrow-down' size={10} />
			</Pressable>
			{isPickerOpen && (
				<FlatList
					style={styles.pickerList}
					renderItem={({ item }) => (
						<CountryItem
							country={item}
							onPress={() => onCallingNumberChange(item)}
						/>
					)}
					data={countries}
					keyExtractor={(item) => item.callingNumber}
					ItemSeparatorComponent={() => <ItemSeparator />}
				/>
			)}
		</View>
	);
};

interface CountryItemProps extends PressableProps {
	country: Country;
}

const CountryItem = ({
	country: { name, callingNumber: callingMunber, flag },
	...props
}: CountryItemProps) => {
	return (
		<Pressable style={styles.countryItem} {...props}>
			<Text style={styles.countryText}>
				{name} ({callingMunber})
			</Text>
		</Pressable>
	);
};

const ItemSeparator = () => <View style={styles.itemSeparator} />;
