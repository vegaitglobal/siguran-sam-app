import { AppScreen } from '@/shared/constants';
import React, { useEffect, useMemo, useState } from 'react';
import { BlogPost } from '../../../../services/content/content.interfaces';
import { ScreenTemplate } from '@/shared/components';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { styles } from './blog-post-list.style';
import contentService from '../../../../services/content/content.service';
import { BlogPostListScreenProps } from '@/shared/types/screen-props';
import Label from '@/shared/components/label';
import { Header } from '@/shared/components/header';

interface BlogPostListItemProps {
  blogPost: BlogPost;
  onPress: (blogPost: BlogPost) => void;
}

export const BlogPostListItem = (props: BlogPostListItemProps) => {
  const imageUrl = `https:${props.blogPost.heroImageURL}`;
  const { title } = props.blogPost;

  return (
    <TouchableOpacity onPress={() => props.onPress(props.blogPost)}>
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
        <View style={styles.textContainer}>
          <Label style={styles.text} type='p2' numberOfLines={2}>
            {title}
          </Label>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BlogPostListScreen = ({ route, navigation }: BlogPostListScreenProps) => {
  const { category } = route.params;
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const fetchBlogPosts = useMemo(
    () => async () => {
      try {
        const result = await contentService.getBlogPosts(category.id);
        setBlogPosts(result);
      } catch (error) {
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
    navigation.navigate(AppScreen.BLOGPOST, {
      blogPost,
    });
  };

  // React Native team suggests using no anonymous function so the function won’t recreate itself every time list is displayed
  // https://blog.logrocket.com/deep-dive-react-native-flatlist/
  const renderItem: ListRenderItem<BlogPost> = ({ item }: ListRenderItemInfo<BlogPost>) => {
    return <BlogPostListItem blogPost={item} onPress={handleOpenBlogPost} />;
  };

  const ItemSeparator = () => <View style={styles.itemSeparator} />;

  return (
    <ScreenTemplate>
      <Header title={category.title} />
      <FlatList
        contentContainerStyle={styles.list}
        data={blogPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ItemSeparatorComponent={ItemSeparator}
      />
    </ScreenTemplate>
  );
};

export default BlogPostListScreen;
