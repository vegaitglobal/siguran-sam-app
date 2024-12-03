import Icon, { IconName } from '@/shared/components/icon';
import { Colors } from '@/shared/styles';
import { Pressable, PressableProps, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

interface Props extends PressableProps {
  title: string;
  icon: IconName;
}

const ListLink = ({ title, icon, ...props }: Props) => {
  return (
    // TODO Convert this to TouchableOpacity to give user some feedback on touching
    <Pressable style={styles.link} {...props}>
      <View style={styles.linkTitleGroup}>
        <Icon size={30} name={icon} />
        <Text style={styles.linkTitle}>{title}</Text>
      </View>
      <Icon name='arrow-small-right' size={10} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    alignItems: 'center'
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
