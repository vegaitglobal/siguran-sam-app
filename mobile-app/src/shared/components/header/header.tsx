import { useNavigation } from '@react-navigation/native';
import { Pressable, PressableProps, Text, View, ViewStyle } from 'react-native';
import Icon from '../icon';
import { styles } from './header.style';
import { AppScreen } from '@/shared/constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/shared/types';

interface Props {
  leftComponent?: JSX.Element;
  hideLeftComponent?: boolean;
  rightComponent?: JSX.Element;
  hideRightComponent?: boolean;
  title?: string;
}

const BackButton = (props: PressableProps) => {
  const { goBack } = useNavigation();

  return (
    <Pressable hitSlop={8} onPress={goBack} {...props}>
      <Icon name='arrow-back' color='white' pointerEvents='none' />
    </Pressable>
  );
};

const MoreOptions = (props: PressableProps) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleMoreOptions = () => {
    navigate(AppScreen.MORE_OPTIONS);
  };

  return (
    <Pressable hitSlop={8} onPress={handleMoreOptions} {...props}>
      <Icon name='hamburger' color='white' pointerEvents='none' />
    </Pressable>
  );
};

export const Header = ({
  title,
  leftComponent,
  rightComponent,
  hideLeftComponent,
  hideRightComponent,
}: Props) => {
  const leftComponentStyle: ViewStyle = {
    opacity: +!hideLeftComponent,
  };

  const rightComponentStyle: ViewStyle = {
    opacity: +!hideRightComponent,
  };

  return (
    <View style={styles.wrapper}>
      <View pointerEvents={hideLeftComponent ? 'none' : 'auto'} style={leftComponentStyle}>
        {leftComponent || <BackButton />}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View pointerEvents={hideRightComponent ? 'none' : 'auto'} style={rightComponentStyle}>
        {rightComponent || <MoreOptions />}
      </View>
    </View>
  );
};
