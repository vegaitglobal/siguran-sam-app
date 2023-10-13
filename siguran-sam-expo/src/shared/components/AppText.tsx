import { FC, memo } from 'react';
import { TextProps, Text, StyleSheet, TextStyle } from 'react-native';

export type TextType = keyof typeof styles;

interface RMTextProps extends TextProps {
  type?: TextType;

  color?: string;
}

const RMText: FC<RMTextProps> = ({
  type = 'p',
  color = 'white',
  style,
  children,
  ...otherProps
}) => {
  const colorStyle: TextStyle = {
    color,
  };

  return (
    <Text style={[styles[type], colorStyle, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default memo(RMText);

const styles = StyleSheet.create({
  h1: {
    // font roboto 700
    fontSize: 25,
  },
  h2: {
    // font roboto 700
    fontSize: 22,
  },
  h3: {
    // font roboto 700
    fontSize: 18,
  },
  h3Black: {
    // font roboto 900
    fontSize: 18,
  },
  h4: {
    // font roboto 700
    fontSize: 13,
  },
  h5: {
    // font roboto 700
    fontSize: 8,
  },
  p: {
    // font roboto 400
    fontSize: 16,
  },
  p2: {
    // font roboto 400
    fontSize: 13,
  },
});
