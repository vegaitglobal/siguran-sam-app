import { Image, ActivityIndicator } from 'react-native';
import { Fragment, useState } from 'react';
import { styles } from './loading-image.style';
import { SvgProps, SvgUri } from 'react-native-svg';

interface LoadingImageProps extends SvgProps {
  imageUrl: string;
  isSVG?: boolean;
}

export const LoadingImage = ({ imageUrl, isSVG, ...svgProps }: LoadingImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoadEnd = () => setIsLoading(false);

  return (
    <Fragment>
      {isSVG ? (
        <SvgUri uri={imageUrl} {...svgProps} />
      ) : (
        <Image style={styles.image} source={{ uri: imageUrl }} onLoadEnd={handleImageLoadEnd} />
      )}
      {isLoading && !isSVG && <ActivityIndicator size='large' style={styles.activityIndicator} />}
    </Fragment>
  );
};
