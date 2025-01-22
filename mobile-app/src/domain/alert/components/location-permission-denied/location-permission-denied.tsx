import { AppButton } from '@/shared/components';
import Label from '@/shared/components/label';
import React, { Fragment } from 'react';
import { Linking } from 'react-native';

const LocationPermissionDenied = () => {
  return (
    <Fragment>
      <Label style={{ marginBottom: 16, textAlign: 'center' }}>
        Molimo Vas, dozvolite pristup Vašoj lokaciji prilikom korišćenja aplikacije u podešavanjima uređaja.
        Bez dozvole pristupa, aplikacija neće moći deliti Vaše koordinate u slučaju opasnosti.
      </Label>
      <AppButton onPress={() => Linking.openSettings()}>PODEŠAVANJA</AppButton>
    </Fragment>
  );
};

export default LocationPermissionDenied;
