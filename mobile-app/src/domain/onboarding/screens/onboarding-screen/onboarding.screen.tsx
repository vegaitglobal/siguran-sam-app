import { ScreenTemplate } from '@/shared/components';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import NextButton from '../../components/next-button';
import BackButton from '../../components/back-button';

export interface Props
	extends NativeStackScreenProps<RootStackParamList, AppScreen.ONBOARDING> {}

const OnboardingScreen = () => {
	return (
		<ScreenTemplate>
			<StatusBar style='light' />
			<View style={styles.mainContentContainer}></View>
			<View style={styles.buttonsContainer}>
				<BackButton />
				<NextButton />
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
