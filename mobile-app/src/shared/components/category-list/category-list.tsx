import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Category } from '../../../services/content/content.interfaces';
import { styles } from '@/shared/components/category-list/category-list.style';

interface CategoryListItemProps {
	category: Category;
	onPress: (categoryName: string) => void;
}

export const CategoryListItem = (props: CategoryListItemProps) => {
	return (
		<TouchableOpacity onPress={() => props.onPress(props.category.title)}>
			<View style={styles.item}>
				<Text style={styles.title}>{props.category.title}</Text>
				<Text style={styles.description}>{props.category.description}</Text>
				<Text style={styles.description}>{props.category.iconURL}</Text>
			</View>
		</TouchableOpacity>
	);
};

const ItemSeparator = () => <View style={styles.itemSeparator} />;

interface CategoryListProps {
	categories: Category[];
	onPress: (categoryName: string) => void;
}

export const CategoryList = (props: CategoryListProps) => {
	return (
		<View style={styles.wrapper}>
			<FlatList
				style={styles.list}
				data={props.categories}
				renderItem={({ item }) => (
					<CategoryListItem category={item} onPress={props.onPress} />
				)}
				keyExtractor={({ title }) => title}
				ItemSeparatorComponent={() => <ItemSeparator />}
			/>
		</View>
	);
};
