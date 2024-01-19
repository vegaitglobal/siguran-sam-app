import { Colors } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  activityIndicator: {
    color: Colors.WHITE.PRIMARY,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
});
