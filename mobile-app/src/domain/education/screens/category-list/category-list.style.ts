import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/styles';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
  },
  list: {
    maxHeight: '100%',
  },
  item: {
    backgroundColor: Colors.RED.SECONDARY,
    borderRadius: 13,
    justifyContent: 'center',
    minHeight: 120,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 8,
  },
  iconContainer: {
    justifyContent: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
});
