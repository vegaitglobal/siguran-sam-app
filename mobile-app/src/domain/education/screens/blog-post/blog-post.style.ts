import { Colors } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  body: {
    color: Colors.WHITE.PRIMARY,
  },
  p: {
    marginVertical: 0, // This is necessary in order to align list items, because HTML has <p> tags inside <li> tags
  },
  li: {
    marginBottom: 8,
  },
  scrollview: {
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: '100%',
    height: 130,
    borderRadius: 13,
    overflow: 'hidden',
    marginVertical: 16,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
});
