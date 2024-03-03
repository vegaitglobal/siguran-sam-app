import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList, RootStackParamList } from '@/shared/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './alert.screen.style';
import { View, Text, ActivityIndicator } from 'react-native';
import Label from '@/shared/components/label';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import useLocation from '@/domain/alert/hooks/use-location';
import CircleButton from '../components/circle-button';
import Moment from 'react-moment';
import 'moment/locale/sr';
import { useUserInfoStore } from '@/shared/store';
import { useContactStore } from '@/shared/store/use-contact-store';
import { sendEmergencyRequest } from '../services/sms-service';
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
