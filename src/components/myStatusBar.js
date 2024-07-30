import {StatusBar} from 'react-native';
import React from 'react';

export const MyStatusBar = () => {
  return (
    <StatusBar
      backgroundColor="rgba(0, 0, 0, 0)"
      barStyle="dark-content"
      translucent={true}
    />
  );
};
