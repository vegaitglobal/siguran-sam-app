import { ScreenTemplate } from '@/shared/components';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import NextButton from '../../components/next-button';
import BackButton from '../../components/back-button';
import { useCallback, useMemo, useState } from 'react';
import Label from '@/shared/components/label';
import StepIndicator from '../../components/step-indicator';

const MAX_STEP = 8;

export interface Props
	extends NativeStackScreenProps<RootStackParamList, AppScreen.ONBOARDING> {}

const OnboardingScreen = () => {
	const [step, setStep] = useState(1);

	const nextStep = useCallback(() => {
		setStep((previous) => {
			if (previous >= MAX_STEP) return previous;

			return previous + 1;
		});
	}, []);

	const previousStep = useCallback(() => {
		setStep((previous) => {
			if (previous <= 1) return previous;

			return previous - 1;
		});
	}, []);

	const isBackDisabled = useMemo(() => {
		if (step === 1) return true;

		return false;
	}, [step]);

	const isNextDisabled = useMemo(() => {
		if (step === MAX_STEP) return true;

		return false;
	}, [step]);
	return (
		<ScreenTemplate>
			<StatusBar style='light' />
			<View style={{ alignItems: 'center', marginTop: 30 }}>
				<StepIndicator step={step} />
			</View>

			<View style={styles.mainContentContainer}>
				<Label>{step}</Label>
			</View>
			<View style={styles.buttonsContainer}>
				<BackButton disabled={isBackDisabled} onPress={previousStep} />
				<NextButton disabled={isNextDisabled} onPress={nextStep} />
			</View>
		</ScreenTemplate>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	mainContentContainer: {
		flex: 1,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
