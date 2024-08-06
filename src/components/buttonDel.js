import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';

export const ButtonDel = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 50,
        backgroundColor: 'red',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Text style={{color: '#FFFFFF', fontSize: 20}}>Xóa</Text>
    </TouchableOpacity>
  );
};
