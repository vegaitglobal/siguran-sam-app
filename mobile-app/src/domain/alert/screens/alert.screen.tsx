import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { ActivityIndicator, View } from 'react-native';
import useLocation from '@/domain/alert/hooks/use-location';
import 'moment/locale/sr';
import LocationPermissionDenied from '../components/location-permission-denied';
import AlertWidget from '../components/alert-widget';
import { useLocationServices } from '../hooks/use-location-services';
import { LocationServicesNotEnabled } from '../components/location-services-not-enabled/location-services-not-enabled';
import { useLocationPermission } from '../hooks/use-location-permission';
import { Fragment } from 'react';
import Label from '@/shared/components/label';

export interface Props
  extends CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
    NativeStackScreenProps<RootStackParamList>
  > {}

const LoadingComponent = () => (
  <View style={styles.container}>
    <ActivityIndicator />
  </View>
);

const LocationServicesDisabledComponent = () => (
  <View style={styles.container}>
    <LocationServicesNotEnabled />
  </View>
);

const PermissionDeniedComponent = () => (
  <View style={styles.container}>
    <LocationPermissionDenied />
  </View>
);

const LoadingLocationIndicator = () => (
  <Fragment>
    <Label style={{ marginBottom: 16, textAlign: 'center' }}>Pronalaženje Vaše lokacije...</Label>
    <ActivityIndicator size='large' color={'#fff'} />
  </Fragment>
);

const AlertScreen = () => {
  const { locationServicesEnabled, loadingLocationServices } = useLocationServices();
  const { permission, loadingPermission } = useLocationPermission();
  const { location } = useLocation({
    canGetLocation: permission?.granted === true && locationServicesEnabled === true,
  });

  if (loadingLocationServices || loadingPermission) return <LoadingComponent />;

  if (!locationServicesEnabled) return <LocationServicesDisabledComponent />;

  if (!permission?.granted) return <PermissionDeniedComponent />;

  return (
    <View style={styles.container}>
      {location ? <AlertWidget location={location} /> : <LoadingLocationIndicator />}
    </View>
  );
};

export default AlertScreen;
