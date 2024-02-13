import { Colors, Paddings, Sizes } from '@/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLACK.PRIMARY,
    paddingHorizontal: Paddings.HORIZONTAL,
    paddingVertical: Paddings.VERTICAL,
  },
  content: {
    backgroundColor: Colors.WHITE.PRIMARY,
    width: '100%',
    flex: 1,
  },
  addButton: {
    marginBottom: 26,
  },
  importButton: {
    marginBottom: 44,
  },
  saveButton: {
    backgroundColor: Colors.RED.PRIMARY,
    borderRadius: 31,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: Sizes.S,
  },
});
