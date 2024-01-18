import { AppScreen } from '@/shared/constants';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { ItemSeparator, ListHeader } from '../../shared/education-shared';

interface BlogPostListItemProps {
  blogPost: BlogPost;
  onPress: (blogPost: BlogPost) => void;
}

export const BlogPostListItem = ({ blogPost, onPress }: BlogPostListItemProps) => {
  const imageUrl = `https:${blogPost.heroImageURL}`;
  const { title } = blogPost;

  const handlePress = () => onPress(blogPost);

  return (
    <TouchableOpacity onPress={handlePress}>
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
  const {
    category: { id: categoryId, title: categoryTitle },
  } = route.params;
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const result = await contentService.getBlogPosts(categoryId);
        setBlogPosts(result);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, [categoryId]);

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

  return (
    <ScreenTemplate>
      <Header title={categoryTitle} />
      <FlatList
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        data={blogPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={ItemSeparator}
      />
    </ScreenTemplate>
  );
};

export default BlogPostListScreen;
