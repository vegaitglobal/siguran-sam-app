import { ScreenTemplate } from '@/shared/components';
import { Header } from '@/shared/components/header';
import Icon, { IconName } from '@/shared/components/icon';
import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, PressableProps, Text, View } from 'react-native';
import { styles } from './more-options.screen.style';

interface LinkProps extends PressableProps {
  title: string;
  icon: IconName;
}

const Link = ({ title, icon, ...props }: LinkProps) => {
  return (
    <Pressable style={styles.link} {...props}>
      <View style={styles.linkTitleGroup}>
        <Icon size={30} name={icon} />
        <Text style={styles.linkTitle}>{title}</Text>
      </View>
      <Icon name='arrow-small-right' size={10} />
    </Pressable>
  );
};

interface Props extends NativeStackScreenProps<RootStackParamList, AppScreen.MORE_OPTIONS> {}

export const MoreOptionsScreen = ({ navigation }: Props) => {
  const handleOpenScreen = (screen: AppScreen) => {
    navigation.navigate(screen);
  };

  return (
    <ScreenTemplate>
      <Header hideRightComponent />
      <View style={styles.container}>
        <Link
          icon='terms'
          title='Uslovi korišćenja'
          onPress={() => handleOpenScreen(AppScreen.TERMS)}
        />
        <Link icon='edit-data' title='Izmeni podatke' />
        <Link icon='about-us' title='O nama' />
        <Link icon='contact-us' title='Kontaktirajte nas' />
        <Link icon='follow-us' title='Zapratite nas' />
        <Link icon='tutorial' title='Tutorial' />
      </View>
    </ScreenTemplate>
  );
};
