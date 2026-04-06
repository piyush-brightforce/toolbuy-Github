import {Image, ImageBackground} from 'react-native';
import React from 'react';
import images from '../../utils/images';
import styles from './style.css';
import {useValues} from '../../../App';

const LoaderScreen = () => {

  const {isDark} = useValues();
  const imageBg = isDark ? images.loaderBgDark : images.loaderBg;
  const loader = isDark ? images.loading : images.loaderGIF;
  return (
    <ImageBackground style={styles.container} source={imageBg}>
      <Image
        style={isDark ? styles.imgStyleDark : styles.imgStyle}
        source={loader}
      />
    </ImageBackground>
  );
};

export default LoaderScreen;
