import React from 'react';
import {Image } from 'react-native';

const index = (props) => {
    const {photo, size} = props
  return (
    <Image
      source={photo ? {uri: photo} : require('../../assets/img/default.png')}
      style={{
        marginHorizontal: 10,
        // height:50,
        // width:50,
        height:size,
        width:size,
        borderRadius: 10,
      }}
    />
  );
};
export default index;
