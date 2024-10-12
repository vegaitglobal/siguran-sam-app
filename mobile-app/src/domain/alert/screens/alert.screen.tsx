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

export interface Props
  extends CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
    NativeStackScreenProps<RootStackParamList>
  > {}

const loadingComponent = (
  <View style={styles.container}>
    <ActivityIndicator />
  </View>
);

const locationServicesDisabledComponent = (
  <View style={styles.container}>
    <LocationServicesNotEnabled />
  </View>
);

const permissionDeniedComponent = (
  <View style={styles.container}>
    <LocationPermissionDenied />
  </View>
);

const AlertScreen = () => {
  const { locationServicesEnabled, loadingLocationServices } = useLocationServices();
  const { permission, loadingPermission } = useLocationPermission();
  const { location } = useLocation({
    canGetLocation: permission?.granted === true && locationServicesEnabled === true,
  });

  if (loadingLocationServices || loadingPermission) return loadingComponent;

  if (locationServicesEnabled === false) return locationServicesDisabledComponent;

  if (permission?.granted === false) return permissionDeniedComponent;

  return (
    <View style={styles.container}>
      <AlertWidget location={location} />
    </View>
  );
};

export default AlertScreen;
