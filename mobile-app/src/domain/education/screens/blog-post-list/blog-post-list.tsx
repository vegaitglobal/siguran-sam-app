import { AppScreen } from '@/shared/constants';
import React, { useEffect, useMemo, useState } from 'react';
import { BlogPost } from '../../../../services/content/content.interfaces';
import { ScreenTemplate } from '@/shared/components';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './blog-post-list.style';
import contentService from '../../../../services/content/content.service';
import { BlogPostListScreenProps } from '@/shared/types/screen-props';

interface BlogPostListItemProps {
  blogPost: BlogPost;
  onPress: (blogPost: BlogPost) => void;
}

export const BlogPostListItem = (props: BlogPostListItemProps) => {
  return (
    <TouchableOpacity onPress={() => props.onPress(props.blogPost)}>
      <View style={styles.item}>
        <Text style={styles.title}>{props.blogPost.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ItemSeparator = () => <View style={styles.itemSeparator} />;

const BlogPostListScreen = ({ route, navigation }: BlogPostListScreenProps) => {
  const { categoryId } = route.params;
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const fetchBlogPosts = useMemo(
    () => async () => {
      try {
        const result = await contentService.getBlogPosts(categoryId);
        console.log(result);
        setBlogPosts(result);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    },
    [categoryId]
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
      <FlatList
        contentContainerStyle={styles.list}
        numColumns={2}
        horizontal={false}
        data={blogPosts}
        renderItem={({ item }) => <BlogPostListItem blogPost={item} onPress={handleOpenBlogPost} />}
        keyExtractor={({ id }) => id}
      />
    </ScreenTemplate>
  );
};

export default BlogPostListScreen;
