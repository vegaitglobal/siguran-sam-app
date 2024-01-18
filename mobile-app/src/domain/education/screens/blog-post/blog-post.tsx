import React, { useEffect, useState } from 'react';
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

const BlogPostScreen = ({ route }: BlogPostScreenProps) => {
  const { blogPost } = route.params;
  const [source, setSource] = useState<HTMLSource | undefined>();
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const htmlContent = blogPost?.content || '';
    setSource({
      html: htmlContent, // The HTML content as a string
    });
  }, [blogPost]);

  const imageUrl = `https:${blogPost.heroImageURL}`;

  return (
    <ScreenTemplate>
      <ScrollView style={styles.scrollview} stickyHeaderIndices={[0]}>
        <Header title={blogPost.title} />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: imageUrl }}
            onLoadEnd={() => setIsLoading(false)}
          />
          {isLoading && <ActivityIndicator size='large' style={styles.activityIndicator} />}
        </View>
        {source ? (
          <RenderHtml contentWidth={width} source={source} tagsStyles={styles} />
        ) : (
          <Text>Loading HTML</Text>
        )}
      </ScrollView>
    </ScreenTemplate>
  );
};

export default BlogPostScreen;
