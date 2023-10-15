import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { AppScreen } from '@/shared/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { BlogPost } from '../../../../services/content/content.interfaces';
import { ScreenTemplate } from '@/shared/components';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './blog-post-list.style';
import contentService from '../../../../services/content/content.service';
export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

interface BlogPostListItemProps {
	blogPost: BlogPost;
	onPress: (blogPost: BlogPost) => void;
}

export const BlogPostListItem = (props: BlogPostListItemProps) => {
	return (
		<TouchableOpacity onPress={() => props.onPress(props.blogPost)}>
			<View style={styles.item}>
				<Text style={styles.title}>{props.blogPost.title}</Text>
				<Text style={styles.description}>{props.blogPost.category}</Text>
				<Text style={styles.description}>{props.blogPost.heroImageURL}</Text>
			</View>
		</TouchableOpacity>
	);
};

const ItemSeparator = () => <View style={styles.itemSeparator} />;

// TODO: Find type of route, navigation
// @ts-ignore
const BlogPostListScreen = ({ route, navigation }) => {
	const { category } = route.params;
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

	// Use useMemo to memoize the data fetching function
	const fetchBlogPosts = useMemo(
		() => async () => {
			try {
				const result = await contentService.getBlogPosts(category.id);
				console.log(result);
				setBlogPosts(result);
			} catch (error) {
				// Handle any errors here
				console.error('Error fetching blog posts:', error);
			}
		},
		[category.id]
	);

	// Call the memoized function when the category changes
	useEffect(() => {
		fetchBlogPosts();
	}, [fetchBlogPosts]);

	const handleOpenBlogPost = (blogPost: BlogPost): void => {
		console.log('Opening blog post: ' + blogPost);
		navigation.navigate(AppScreen.BLOGPOST, {
			blogPost,
		});
	};

	return (
		<ScreenTemplate>
			<View style={styles.wrapper}>
				<FlatList
					style={styles.list}
					data={blogPosts}
					renderItem={({ item }) => (
						<BlogPostListItem blogPost={item} onPress={handleOpenBlogPost} />
					)}
					keyExtractor={({ title }) => title}
					ItemSeparatorComponent={() => <ItemSeparator />}
				/>
			</View>
		</ScreenTemplate>
	);
};

export default BlogPostListScreen;
