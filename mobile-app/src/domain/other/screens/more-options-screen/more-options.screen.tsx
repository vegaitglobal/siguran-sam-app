import { ScreenTemplate } from '@/shared/components';
import { Header } from '@/shared/components/header';
import { AppScreen } from '@/shared/constants';
import { useContactDetailsStore } from '@/shared/store';
import { RootStackParamList } from '@/shared/types';
import { openExternalLink } from '@/shared/utils/linking-utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import ListLink from '../../components';
import { styles } from './more-options.screen.style';

interface Props extends NativeStackScreenProps<RootStackParamList, AppScreen.MORE_OPTIONS> {}

export const MoreOptionsScreen = ({ navigation }: Props) => {
  const { website } = useContactDetailsStore();

  return (
    <ScreenTemplate>
      <Header hideRightComponent />
      <View style={styles.container}>
        <ListLink
          icon='terms'
          title='Uslovi korišćenja'
          onPress={() => navigation.navigate(AppScreen.TERMS)}
        />
        <ListLink
          icon='edit-data'
          title='Izmeni podatke'
          onPress={() => navigation.navigate(AppScreen.USER_DETAILS)}
        />
        <ListLink icon='about-us' title='O nama' onPress={() => openExternalLink(website)} />
        <ListLink
          icon='contact-us'
          title='Kontaktirajte nas'
          onPress={() => navigation.navigate(AppScreen.CONTACT_DETAILS)}
        />
        <ListLink
          icon='follow-us'
          title='Zapratite nas'
          onPress={() => navigation.navigate(AppScreen.CONTACT_DETAILS)}
        />
      </View>
    </ScreenTemplate>
  );
};
