import { Colors, Sizes } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 22,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    backgroundColor: Colors.BLACK.PRIMARY,
  },
  titleContainer: {
    maxWidth: '80%',
  },
  title: {
    color: 'white',
    fontSize: Sizes.L,
    fontWeight: '900',
  },
});
