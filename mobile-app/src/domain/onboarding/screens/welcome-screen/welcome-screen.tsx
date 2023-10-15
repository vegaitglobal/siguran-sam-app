import { ScreenTemplate } from '@/shared/components';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Logo from '@/shared/assets/images/logo.svg';
import LogoText from '@/shared/assets/images/logo-text.svg';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { useEffect } from 'react';

import { setIsOnboardingDone } from '@/shared/store';

export interface Props
	extends NativeStackScreenProps<RootStackParamList, AppScreen.WELCOME> {}

const WelcomeScreen = () => {
	useEffect(() => {
		const timeout = setTimeout(setIsOnboardingDone, 3500);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<ScreenTemplate>
			<StatusBar style='light' />
			<View style={styles.screenContainer}>
				<View style={styles.logoContainer}>
					<Animated.View entering={FadeInRight.delay(500).duration(750)}>
						<Logo width='100' height='100' viewBox='0 0 322 300' />
					</Animated.View>
					<View style={styles.separator} />
					<Animated.View entering={FadeIn.delay(1500).duration(1000)}>
						<LogoText width='120' height='60' viewBox='0 0 46 22' />
					</Animated.View>
				</View>
			</View>
		</ScreenTemplate>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	logoContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	separator: {
		width: 8,
	},
});
