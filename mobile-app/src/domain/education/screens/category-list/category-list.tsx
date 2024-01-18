import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Category } from '../../../../services/content/content.interfaces';
import { styles } from '@/domain/education/screens/category-list/category-list.style';
import Label from '@/shared/components/label';
import { ItemSeparator, ListHeader } from '../../shared/education-shared';

interface CategoryListItemProps {
  category: Category;
  onPress: (category: Category) => void;
}

export const CategoryListItem = ({ category, onPress }: CategoryListItemProps) => {
  const { title, description, iconURL } = category;
  const imageUri = `https:${iconURL}`;

  const handleOnPress = () => onPress(category);

  return (
    <TouchableOpacity style={styles.item} onPress={handleOnPress}>
      <View style={styles.textContainer}>
        <Label numberOfLines={2} type='h3Black'>
          {title}
        </Label>
        <ItemSeparator />
        <Label numberOfLines={3} type='p2'>
          {description}
        </Label>
      </View>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={{ uri: imageUri }} />
      </View>
    </TouchableOpacity>
  );
};

interface CategoryListProps {
  categories: Category[];
  onPress: (category: Category) => void;
}

export const CategoryList = ({ categories, onPress }: CategoryListProps) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.list}
        data={categories}
        renderItem={({ item }) => <CategoryListItem category={item} onPress={onPress} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};
