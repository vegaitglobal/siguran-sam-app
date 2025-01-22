import { AppButton } from '@/shared/components';
import Label from '@/shared/components/label';
import React, { Fragment } from 'react';
import { Linking } from 'react-native';

export const LocationServicesNotEnabled = () => {
  return (
    <Fragment>
      <Label style={{ marginBottom: 16, textAlign: 'center' }}>
        Molimo Vas, uključite servise lokacije u podešavanjima uređaja.
        Bez uključenih servisa, aplikacija neće moći deliti Vaše koordinate u slučaju opasnosti.
      </Label>
      <AppButton onPress={() => Linking.openSettings()}>PODEŠAVANJA</AppButton>
    </Fragment>
  );
};
