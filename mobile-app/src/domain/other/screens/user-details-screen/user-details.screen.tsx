import { AppButton, ScreenTemplate } from '@/shared/components';
import AppInput from '@/shared/components/app-input';
import { Header } from '@/shared/components/header';
import Label from '@/shared/components/label';
import { AppScreen } from '@/shared/constants';
import { setFullName as persistFullName, useUserInfoStore } from '@/shared/store';
import { RootStackParamList } from '@/shared/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

interface Props extends NativeStackScreenProps<RootStackParamList, AppScreen.USER_DETAILS> {}

const UserDetailsScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState(useUserInfoStore().fullName);

  const saveFullName = () => {
    persistFullName(fullName.trim());

    Alert.alert('Promene sačuvane', undefined, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScreenTemplate>
      <Header title='Izmeni podatke' hideRightComponent />
      <View style={styles.screenContainer}>
        <View style={styles.mainContent}>
          <Label type='h1' style={styles.subtitle}>
            Ime i prezime
          </Label>
          <AppInput
            value={fullName}
            onChangeText={setFullName}
            placeholder='Unesite Vaše ime i prezime'
          />
        </View>
        <View style={styles.bottomContent}>
          <AppButton onPress={saveFullName}>Sačuvaj</AppButton>
        </View>
      </View>
    </ScreenTemplate>
  );
};

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
  subtitle: {
    marginBottom: 12,
  },
});

export default UserDetailsScreen;
