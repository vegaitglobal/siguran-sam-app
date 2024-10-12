import { AppButton } from '@/shared/components';
import Label from '@/shared/components/label';
import React, { Fragment } from 'react';
import { Linking } from 'react-native';

export const LocationServicesNotEnabled = () => {
  return (
    <Fragment>
      <Label style={{ marginBottom: 16, textAlign: 'center' }}>
        Molim Vas, ukljičite servise lokacije u podešavanjima.
      </Label>
      <AppButton onPress={() => Linking.openSettings()}>PODEŠAVANJA</AppButton>
    </Fragment>
  );
};
