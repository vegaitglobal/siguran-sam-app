import { ScreenTemplate } from '@/shared/components';
import { Header } from '@/shared/components/header';
import Label from '@/shared/components/label';
import { Colors } from '@/shared/styles';
import { ScrollView, StyleSheet, View } from 'react-native';
import ListLink from '../../components';
import { useContactDetailsStore, useContentStore } from '@/shared/store';
import { openEmailLink, openExternalLink, openPhoneNumberLink } from '@/shared/utils/linking-utils';
import { LoadingImage } from '@/shared/components/loading-image/loading-image';
import * as Application from 'expo-application';

const ContactDetailsScreen = () => {
  const { logoWithText } = useContentStore();

  const { website, phoneNumber, email, facebook, instagram, twitter, linkedin } =
    useContactDetailsStore();

  return (
    <ScreenTemplate>
      <Header title='Kontaktirajte nas' hideRightComponent />
      <View style={styles.screenContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContent}>
          <Label style={styles.subtitle}>KONTAKT</Label>
          <View style={styles.linkGroup}>
            <ListLink
              icon='phone'
              title={phoneNumber}
              onPress={() => openPhoneNumberLink(phoneNumber)}
            />
            <ListLink icon='contact-us' title={email} onPress={() => openEmailLink(email)} />
            <ListLink
              icon='website'
              title={website.replace('https://', '')}
              onPress={() => openExternalLink(website)}
            />
          </View>
          <Label style={styles.subtitle}>DRUŠTVENE MREŽE</Label>
          <View style={styles.linkGroup}>
            {instagram && (
              <ListLink
                icon='instagram'
                title='Instragram'
                onPress={() => openExternalLink(instagram)}
              />
            )}
            {facebook && (
              <ListLink
                icon='facebook'
                title='Facebook'
                onPress={() => openExternalLink(facebook)}
              />
            )}
            {twitter && (
              <ListLink icon='twitter' title='X' onPress={() => openExternalLink(twitter)} />
            )}
            {linkedin && (
              <ListLink
                icon='linkedin'
                title='Linkedin'
                onPress={() => openExternalLink(linkedin)}
              />
            )}
          </View>
        </ScrollView>
        <View style={styles.bottomContent}>
          {logoWithText && (
            <LoadingImage
              imageUrl={logoWithText.url}
              isSVG={logoWithText.isSVG}
              style={styles.logo}
            />
          )}
          <Label type='pItalicSmallest' color={Colors.GRAY.DISABLED}>
            Verzija aplikacije {Application.nativeApplicationVersion}
          </Label>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default ContactDetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  bottomContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 10,
  },
  version: {
    color: Colors.GRAY.PRIMARY,
  },
  linkGroup: {
    backgroundColor: Colors.BLACK.SECONDARY,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    marginBottom: 40,
  },
  subtitle: {
    paddingLeft: 20,
    marginBottom: 5,
  },
});
