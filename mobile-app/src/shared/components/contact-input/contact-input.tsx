import { Country } from '@/shared/types';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './contact-input.style';
import { CountryPicker, countries } from './country-picker/country-picker';

interface Props {
	onChange?: (number: string) => void;
}

export const ContactInput = ({ onChange }: Props) => {
	const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
	const [phoneNumber, setPhoneNumber] = useState<string>();

	const onNumberChange = (value: string) => {
		setPhoneNumber(value);
		onChange?.(`${selectedCountry.callingNumber}${value}`);
	};

	const onCountryChange = (country: Country) => {
		setSelectedCountry(country);
		onChange?.(`${country.callingNumber}${phoneNumber}`);
	};

	return (
		<View style={styles.wrapper}>
			<CountryPicker
				onCountryChange={onCountryChange}
				selectedCountry={selectedCountry}
			/>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					keyboardType='number-pad'
					placeholder='123 456'
					onChangeText={onNumberChange}
					value={phoneNumber}
				/>
			</View>
		</View>
	);
};
