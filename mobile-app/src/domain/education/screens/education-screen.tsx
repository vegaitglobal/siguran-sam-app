import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenTemplate } from '@/shared/components';
import React, { useState } from 'react';
import { Category } from '../../../services/content/content.interfaces';
import contentService from '../../../services/content/content.service';
import { CategoryList } from '@/shared/components/category-list';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const EducationScreen = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	contentService.getCategories().then((result: Category[]) => {
		setCategories(result);
	});

	const handleOpenCategory = (categoryName: string): void => {
		console.log('opening category screen with name: ' + categoryName);
	};

	return (
		<ScreenTemplate>
			<CategoryList categories={categories} onPress={handleOpenCategory} />
		</ScreenTemplate>
	);
};

export default EducationScreen;
