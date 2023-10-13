import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export interface Props
	extends NativeStackScreenProps<RootStackParamList, AppScreen.SPLASH> {}

const SplashScreen = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator />
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
