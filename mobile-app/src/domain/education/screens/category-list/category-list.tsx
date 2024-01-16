import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Category } from '../../../../services/content/content.interfaces';
import { styles } from '@/domain/education/screens/category-list/category-list.style';
import Label from '@/shared/components/label';

interface CategoryListItemProps {
  category: Category;
  onPress: (categoryId: string) => void;
}

export const CategoryListItem = (props: CategoryListItemProps) => {
  const imageUri = 'http:' + props.category.iconURL;
  console.log(imageUri);
  return (
    <TouchableOpacity style={styles.item} onPress={() => props.onPress(props.category.id)}>
      <View style={styles.textContainer}>
        <Label numberOfLines={2} type='h3Black'>
          {props.category.title}
        </Label>
        <ItemSeparator />
        <Label numberOfLines={3} type='p2'>
          {props.category.description}
        </Label>
      </View>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={{ uri: imageUri }} />
      </View>
    </TouchableOpacity>
  );
};

const ItemSeparator = () => <View style={styles.itemSeparator} />;
const ListHeader = () => <View style={styles.listHeader} />;

interface CategoryListProps {
  categories: Category[];
  onPress: (categoryId: string) => void;
}

export const CategoryList = (props: CategoryListProps) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.list}
        data={props.categories}
        renderItem={({ item }) => <CategoryListItem category={item} onPress={props.onPress} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </View>
  );
};
