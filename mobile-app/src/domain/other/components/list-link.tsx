import Icon, { IconName } from '@/shared/components/icon';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
  icon: IconName;
}

const ListLink = ({ title, icon, ...props }: Props) => {
  return (
    // TODO Convert this to TouchableOpacity to give user some feedback on touching
    <TouchableOpacity style={styles.link} {...props}>
      <View style={styles.linkTitleGroup}>
        <Icon size={30} name={icon} />
        <Text style={styles.linkTitle}>{title}</Text>
      </View>
      <Icon name='arrow-small-right' size={10} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    alignItems: 'center',
  },
  linkTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkTitle: {
    fontWeight: '700',
    color: 'white',
    marginLeft: 15,
  },
});

export default ListLink;
