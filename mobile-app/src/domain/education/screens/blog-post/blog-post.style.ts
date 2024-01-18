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
  container: {
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 13,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  activityIndicator: {
    color: Colors.WHITE.PRIMARY,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
