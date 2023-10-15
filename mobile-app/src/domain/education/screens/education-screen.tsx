import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenTemplate } from '@/shared/components';
import React, { useState } from 'react';
import { Category } from '../../../services/content/content.interfaces';
import contentService from '../../../services/content/content.service';
import { CategoryList } from 'src/domain/education/screens/category-list';

export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const EducationScreen = ({ navigation }) => {
	const [categories, setCategories] = useState<Category[]>([]);
	contentService.getCategories().then((result: Category[]) => {
		setCategories(result);
	});

	const handleOpenCategory = (category: Category): void => {
		console.log('Opening category: ' + category.title);
		console.table(category);
		navigation.navigate(AppScreen.BLOGPOSTLIST, {
			category,
		});
	};

	return (
		<ScreenTemplate>
			<CategoryList categories={categories} onPress={handleOpenCategory} />
		</ScreenTemplate>
	);
};

export default EducationScreen;
