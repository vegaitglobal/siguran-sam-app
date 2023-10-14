import { Country } from '@/shared/types';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './contact-input.style';
import { CountryPicker, countries } from './country-picker/country-picker';

export interface PhoneNumber {
	callingNumber: string;
	mainNumberPart: string;
}

interface Props {
	onChange?: (number: PhoneNumber) => void;
	number: PhoneNumber;
}

export const ContactInput = ({ onChange, number }: Props) => {
	const [selectedCountry, setSelectedCountry] = useState<Country>(
		countries.find((c) => c.callingNumber === number.callingNumber) ||
			countries[0]
	);

	const onNumberChange = (value: string) => {
		onChange?.({
			callingNumber: selectedCountry.callingNumber,
			mainNumberPart: value,
		});
	};

	const onCountryChange = (country: Country) => {
		setSelectedCountry(country);
		onChange?.({
			callingNumber: country.callingNumber,
			mainNumberPart: number.mainNumberPart,
		});
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
					value={number.mainNumberPart}
				/>
			</View>
		</View>
	);
};
