import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { AppScreen } from '@/shared/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScreenTemplate } from '@/shared/components';
import { Text, View } from 'react-native';
import { styles } from './blog-post.style';
import RenderHtml, { HTMLSource } from 'react-native-render-html';
export interface Props
	extends CompositeScreenProps<
		BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
		NativeStackScreenProps<RootStackParamList>
	> {}

// TODO: Find type of route
// @ts-ignore
const BlogPostScreen = ({ route }) => {
	const { blogPost } = route.params;
	const [source, setSource] = useState<HTMLSource | undefined>();
	useEffect(() => {
		console.log('opened blog post: ' + blogPost.title);
		console.log(blogPost);

		const htmlContent = blogPost.content[0] || '';
		setSource({
			html: htmlContent, // The HTML content as a string
		});
	}, [blogPost]);

	return (
		<ScreenTemplate>
			<View style={styles.wrapper}>
				<Text style={styles.item}>Blog post title: {blogPost.title}</Text>
				{source ? (
					<RenderHtml contentWidth={300} source={source} />
				) : (
					<Text>Loading HTML</Text>
				)}
			</View>
		</ScreenTemplate>
	);
};

export default BlogPostScreen;
