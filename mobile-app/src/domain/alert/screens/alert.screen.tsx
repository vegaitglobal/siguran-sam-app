import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { View } from 'react-native';
import useLocation from '@/domain/alert/hooks/use-location';
import 'moment/locale/sr';
import LocationPermissionDenied from '../components/location-permission-denied';
import AlertWidget from '../components/alert-widget';

export interface Props
  extends CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, AppScreen.ALERT>,
    NativeStackScreenProps<RootStackParamList>
  > {}

const AlertScreen = () => {
  const { isPermissionGranted, location } = useLocation();

  return (
    <View style={styles.container}>
      {isPermissionGranted ? <AlertWidget location={location} /> : <LocationPermissionDenied />}
    </View>
  );
};

export default AlertScreen;
