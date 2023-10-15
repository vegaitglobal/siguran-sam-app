import { View } from 'react-native';
import React, { useState } from 'react';
import contentService from '../../../services/content/content.service';
import { CategoryList } from '@/shared/components/category-list';
import { Category } from '../../../services/content/content.interfaces';

export const CategoryListWidget = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	contentService.getCategories().then((result: Category[]) => {
		setCategories(result);
	});

	const handleOpenCategory = (categoryName: string): void => {
		console.log('opening category screen with name: ' + categoryName);
	};

	return (
		<View>
			<CategoryList categories={categories} onPress={handleOpenCategory} />
		</View>
	);
};
