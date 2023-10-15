import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenTemplate } from '@/shared/components';
import { TabView } from 'react-native-elements';
import { CategoryListWidget } from '@/shared/components/category-list-widget';
import React from 'react';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const EducationScreen = () => {
	return (
		<ScreenTemplate>
			{/*<TabView />*/}
			<CategoryListWidget />
		</ScreenTemplate>
	);
};

export default EducationScreen;
