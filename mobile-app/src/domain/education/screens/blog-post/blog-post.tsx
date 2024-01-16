import React, { useEffect, useState } from 'react';
import { ScreenTemplate } from '@/shared/components';
import { Text, View } from 'react-native';
import { styles } from './blog-post.style';
import RenderHtml, { HTMLSource } from 'react-native-render-html';
import { BlogPostScreenProps } from '@/shared/types/screen-props';

const BlogPostScreen = ({ route }: BlogPostScreenProps) => {
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
        {source ? <RenderHtml contentWidth={300} source={source} /> : <Text>Loading HTML</Text>}
      </View>
    </ScreenTemplate>
  );
};

export default BlogPostScreen;
