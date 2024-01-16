import { NavigatorScreenParams } from '@react-navigation/native';
import { AppScreen } from '../constants';
import { RootStackParamList } from './root-stack-param-list';

export type BottomTabsParamList = {
  [AppScreen.ALERT]: undefined;
  [AppScreen.CONTACTS]: undefined;
  [AppScreen.EDUCATION]: NavigatorScreenParams<RootStackParamList>;
};
