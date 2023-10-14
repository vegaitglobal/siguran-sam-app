import { ScreenTemplate } from '@/shared/components';
import Label from '@/shared/components/label';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface Props
	extends NativeStackScreenProps<RootStackParamList, AppScreen.ONBOARDING> {}

const OnboardingScreen = () => {
	return (
		<ScreenTemplate>
			<Label>Onboarding</Label>
		</ScreenTemplate>
	);
};

export default OnboardingScreen;
