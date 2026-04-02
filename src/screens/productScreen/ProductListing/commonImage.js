import React, { useState } from 'react';
import { Image } from 'react-native';

const CommonImage = ({ uri, style }) => {
  const [error, setError] = useState(false);

  return (
    <Image
      source={
        error || !uri
          ? require('../../../assets/images/homeScreenOne/placeholder.jpeg')
          : { uri: uri }
      }
      style={style}
      resizeMode={error || !uri?'cover':"contain"}
      onError={() => setError(true)}
    />
  );
};

export default CommonImage;
