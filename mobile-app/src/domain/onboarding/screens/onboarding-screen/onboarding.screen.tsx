import { ScreenTemplate } from '@/shared/components';
import Label from '@/shared/components/label';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import NextButton from '../../components/next-button';

export interface Props
	extends NativeStackScreenProps<RootStackParamList, AppScreen.ONBOARDING> {}

const OnboardingScreen = () => {
	return (
		<ScreenTemplate>
			<StatusBar style='light' />
			<View style={styles.screenContainer}></View>
			<NextButton />
		</ScreenTemplate>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
	},
});
