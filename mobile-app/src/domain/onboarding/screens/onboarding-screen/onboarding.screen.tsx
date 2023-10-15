import { ScreenTemplate } from '@/shared/components';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import NextButton from '../../components/next-button';
import BackButton from '../../components/back-button';
import { useCallback, useMemo, useState } from 'react';
import StepIndicator from '../../components/step-indicator';
import MainOnboardingComponent from '../../components/main-onboarding-component/main-onboarding-component';
import { useUserInfoStore } from '@/shared/store';
import { useContactStore } from '@/shared/store/use-contact-store';

const MAX_STEP = 8;

export interface Props
	extends NativeStackScreenProps<RootStackParamList, AppScreen.ONBOARDING> {}

const OnboardingScreen = ({ navigation }: Props) => {
	const [step, setStep] = useState(1);
	const [name, setName] = useState(useUserInfoStore.getState().name);
	const { contacts } = useContactStore();

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

	const nextButtonOnPressHandler = useCallback(() => {
		if (step === 8 && contacts.length > 0 && !!name) {
			setName(name);
			navigation.replace(AppScreen.WELCOME);
		} else {
			nextStep();
		}
	}, [name, step, contacts.length, nextStep]);

	const isBackDisabled = useMemo(() => {
		if (step === 1) return true;

		return false;
	}, [step]);

	const isNextDisabled = useMemo(() => {
		if (step === 7 && !name) return true;

		if (step === 8 && contacts.length <= 0) return true;

		return false;
	}, [step, name, contacts]);

	return (
		<ScreenTemplate>
			<View style={{ alignItems: 'center', marginTop: 30 }}>
				<StepIndicator step={step} />
			</View>
			<KeyboardAvoidingView
				behavior='padding'
				enabled={Platform.OS === 'ios'}
				style={styles.flex}
			>
				<View style={styles.flex}>
					<MainOnboardingComponent
						step={step}
						name={name}
						onChangeName={setName}
					/>
				</View>
				<View style={styles.buttonsContainer}>
					<BackButton disabled={isBackDisabled} onPress={previousStep} />
					<NextButton
						disabled={isNextDisabled}
						onPress={nextButtonOnPressHandler}
					/>
				</View>
			</KeyboardAvoidingView>
		</ScreenTemplate>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 10,
	},
});
