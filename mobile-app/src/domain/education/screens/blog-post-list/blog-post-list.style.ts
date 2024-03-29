import { Colors } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  column: {
    justifyContent: 'space-between',
  },
  list: {
    paddingHorizontal: 16,
  },
  item: {
    flex: 0.5,
    height: 160,
    width: 150,
    borderRadius: 13,
    overflow: 'hidden',
    marginHorizontal: 12,
    marginBottom: 12,
  },
  imageContainer: {
    width: '100%',
    height: '66%',
    backgroundColor: Colors.BLOG_POST_BACKGROUND.PRIMARY,
  },
  textContainer: {
    width: '100%',
    height: '34%',
    justifyContent: 'center',
    padding: 6,
    backgroundColor: Colors.BLOG_POST_BACKGROUND.SECONDARY,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  text: {
    width: '100%',
  },
});
