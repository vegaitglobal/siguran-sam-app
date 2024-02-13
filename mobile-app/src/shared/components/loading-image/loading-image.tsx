import { Image, ActivityIndicator } from 'react-native';
import { Fragment, useState } from 'react';
import { styles } from './loading-image.style';

interface LoadingImageProps {
  imageUrl: string;
}

export const LoadingImage = ({ imageUrl }: LoadingImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoadEnd = () => setIsLoading(false);

  return (
    <Fragment>
      <Image style={styles.image} source={{ uri: imageUrl }} onLoadEnd={handleImageLoadEnd} />
      {isLoading && <ActivityIndicator size='large' style={styles.activityIndicator} />}
    </Fragment>
  );
};
