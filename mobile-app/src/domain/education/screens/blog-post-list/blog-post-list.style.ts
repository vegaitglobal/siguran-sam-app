import { Colors } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
  },
  item: {
    height: 160,
    width: 150,
    borderRadius: 13,
    overflow: 'hidden',
    margin: 10,
  },
  upper: {
    width: '100%',
    height: '66%',
    backgroundColor: Colors.BLOG_POST_BACKGROUND.PRIMARY,
  },
  lower: {
    width: '100%',
    height: '34%',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: Colors.BLOG_POST_BACKGROUND.SECONDARY,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  itemSeparator: {
    height: 10,
  },
});
