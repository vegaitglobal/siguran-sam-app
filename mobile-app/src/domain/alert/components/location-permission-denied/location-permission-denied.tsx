import { AppButton } from '@/shared/components';
import Label from '@/shared/components/label';
import React, { Fragment } from 'react';
import { Linking } from 'react-native';

const LocationPermissionDenied = () => {
  return (
    <Fragment>
      <Label style={{ marginBottom: 16, textAlign: 'center' }}>
        Molim Vas, dozvolite pristup Vašoj lokaciji prilikom korišćenja aplikacije u podešavanjima.
        Bez dozvole pristupa, nećete moći precizno deliti svoje koordinate sa svojim kontaktima u
        slučaju opasnosti.
      </Label>
      <AppButton onPress={() => Linking.openSettings()}>PODEŠAVANJA</AppButton>
    </Fragment>
  );
};

export default LocationPermissionDenied;
