import { useCountriesStore } from '@/shared/store/use-countries-store';
import { Country } from '@/shared/types';
import React, { useState } from 'react';
import {
	FlatList,
	ImageBackground,
	Pressable,
	PressableProps,
	Text,
	View,
} from 'react-native';
import Icon from '../../icon';
import { styles } from './country-picker.style';
import { Image } from 'react-native';

interface Props {
	onCountryChange: (country: Country) => void;
	selectedCountry: Country;
}

export const CountryPicker = ({ onCountryChange, selectedCountry }: Props) => {
	const { countries } = useCountriesStore();

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
	const [flagLoaded, setFlagLoaded] = useState(true);

	return (
		<Pressable style={styles.countryItem} {...props}>
			{flagLoaded && (
				<View style={styles.flagContainer}>
					<Image
						source={{ uri: flag }}
						style={styles.flag}
						onError={() => setFlagLoaded(false)}
						onLoad={() => setFlagLoaded(true)}
					/>
				</View>
			)}
			<Text style={styles.countryText}>
				{name} ({callingMunber})
			</Text>
		</Pressable>
	);
};

const ItemSeparator = () => <View style={styles.itemSeparator} />;
