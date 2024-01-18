import React, { useState } from 'react';
import { ScreenTemplate } from '@/shared/components';
import {
  ScrollView,
  Text,
  View,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { styles } from './blog-post.style';
import RenderHtml, { HTMLSource } from 'react-native-render-html';
import { BlogPostScreenProps } from '@/shared/types/screen-props';
import { Header } from '@/shared/components/header';
import { ListHeader } from '../../shared/education-shared';

const BlogPostScreen = ({ route }: BlogPostScreenProps) => {
  const { blogPost } = route.params;
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);

  const imageUrl = `https:${blogPost.heroImageURL}`;
  const htmlContent = blogPost?.content || '';
  const source: HTMLSource = { html: htmlContent };

  const handleImageLoadEnd = () => setIsLoading(false);

  return (
    <ScreenTemplate>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        <Header title={blogPost.title} />
        <ListHeader />
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} onLoadEnd={handleImageLoadEnd} />
            {isLoading && <ActivityIndicator size='large' style={styles.activityIndicator} />}
          </View>
          {source ? (
            <RenderHtml contentWidth={width} source={source} tagsStyles={styles} />
          ) : (
            <Text>Loading HTML</Text>
          )}
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};

export default BlogPostScreen;
