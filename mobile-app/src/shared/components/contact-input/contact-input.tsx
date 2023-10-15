import { Country } from '@/shared/types';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './contact-input.style';
import { CountryPicker } from './country-picker/country-picker';
import { Colors } from '@/shared/styles';
import { useCountriesStore } from '@/shared/store/use-countries-store';

export interface PhoneNumber {
	callingNumber: string;
	mainNumberPart: string;
}

interface Props {
	onChange?: (number: PhoneNumber) => void;
	number: PhoneNumber;
}

const SERBIA: Country = {
	name: 'Srbija',
	callingNumber: '+381',
	flag: 'https://flagsapi.com/RS/flat/64.png',
	code: 'RS',
};

export const ContactInput = ({ onChange, number }: Props) => {
	const { countries } = useCountriesStore();

	const [selectedCountry, setSelectedCountry] = useState<Country>(
		countries.find((c) => c.callingNumber === number.callingNumber) || SERBIA
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
					placeholderTextColor={Colors.GRAY_2.SECODNARY}
					placeholder='123 456'
					onChangeText={onNumberChange}
					value={number.mainNumberPart}
				/>
			</View>
		</View>
	);
};
