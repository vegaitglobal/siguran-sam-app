import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, CompositeScreenProps, RouteProp } from '@react-navigation/native';
import { BottomTabsParamList } from './bottom-tabs-param-list';
import { AppScreen } from '../constants';
import { RootStackParamList } from './root-stack-param-list';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export interface EducationScreenProps
  extends CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, AppScreen.EDUCATION>,
    NativeStackScreenProps<RootStackParamList>
  > {}

export interface BlogPostListScreenProps {
  route: RouteProp<RootStackParamList, AppScreen.BLOGPOSTLIST>;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabsParamList, AppScreen.EDUCATION>,
    NativeStackNavigationProp<RootStackParamList, AppScreen.BLOGPOSTLIST>
  >;
}

export interface BlogPostScreenProps {
  route: RouteProp<RootStackParamList, AppScreen.BLOGPOST>;
}
