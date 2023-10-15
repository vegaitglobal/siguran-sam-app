import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { AppScreen } from '@/shared/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ScreenTemplate } from '@/shared/components';
import { Text, View } from 'react-native';
import { styles } from './blog-post.style';
export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

const BlogPostScreen = ({ route }) => {
	const { blogPost } = route.params;

	useEffect(() => {
		console.log('opened blog post: ' + blogPost.title);
		console.log(blogPost);
	});

	return (
		<ScreenTemplate>
			<View style={styles.wrapper}>
				<Text style={styles.item}>Blog post title: {blogPost.title}</Text>
			</View>
		</ScreenTemplate>
	);
};

export default BlogPostScreen;
