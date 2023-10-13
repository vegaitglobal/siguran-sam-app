import Icon from '@/shared/components/icon';
import Label from '@/shared/components/label';
import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const EducationScreen = () => {
	return (
		<View style={styles.container}>
			<Label color='black'>Education</Label>
		</View>
	);
};

export default EducationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
