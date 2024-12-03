import { Alert, Linking } from 'react-native';

export const openExternalLink = async (
  url: string,
  errorMsg = 'Vaš uređaj ne podržava otvaranje ovog linka'
) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(errorMsg);
  }
};

export const openPhoneNumberLink = async (number: string) =>
  await openExternalLink(`tel:${number}`);

export const openEmailLink = async (email: string) => await openExternalLink(`mailto:${email}`);
