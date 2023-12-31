import { AppButton, ScreenTemplate } from '@/shared/components';
import Label from '@/shared/components/label';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import LogoWithText from '@/shared/assets/images/logo-with-text.svg';
import Animated, { FadeIn } from 'react-native-reanimated';

export interface Props
	extends NativeStackScreenProps<RootStackParamList, AppScreen.TERMS> {}

const TermsScreen = ({ navigation }: Props) => {
	const acceptOnPressHandler = () => {
		navigation.replace(AppScreen.ONBOARDING);
	};

	return (
		<ScreenTemplate>
			<View style={{ paddingHorizontal: 20, flex: 1, alignItems: 'center' }}>
				<Animated.View entering={FadeIn.delay(500)}>
					<LogoWithText style={styles.logo} />
				</Animated.View>
				<Animated.View
					entering={FadeIn.delay(500)}
					style={styles.screenContainer}
				>
					<Label type='h1' style={styles.title}>
						Uslovi korišćenja
					</Label>
					<Label type='p2'>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.
					</Label>
				</Animated.View>
				<Animated.View entering={FadeIn.delay(500)}>
					<AppButton onPress={acceptOnPressHandler}>
						PRIHVATI USLOVE KORIŠĆENJA
					</AppButton>
				</Animated.View>
			</View>
		</ScreenTemplate>
	);
};

export default TermsScreen;

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: { marginBottom: 10 },
	logo: { marginTop: 26 },
});
