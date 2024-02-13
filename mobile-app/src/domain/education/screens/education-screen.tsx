import { AppScreen } from '@/shared/constants';
import { ScreenTemplate } from '@/shared/components';
import React, { useEffect, useState } from 'react';
import { Category } from '../../../services/content/content.interfaces';
import contentService from '../../../services/content/content.service';
import { CategoryList } from 'src/domain/education/screens/category-list';
import { Header } from '@/shared/components/header';
import { EducationScreenProps } from '@/shared/types/screen-props';

const EducationScreen = ({ navigation }: EducationScreenProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    contentService.getCategories().then((result: Category[]) => {
      setCategories(result);
    });
  }, []);

  const handleOpenCategory = (category: Category): void => {
    navigation.navigate(AppScreen.BLOGPOSTLIST, {
      category,
    });
  };

  return (
    <ScreenTemplate>
      <Header title='Edukacija' />
      <CategoryList categories={categories} onPress={handleOpenCategory} />
    </ScreenTemplate>
  );
};

export default EducationScreen;
