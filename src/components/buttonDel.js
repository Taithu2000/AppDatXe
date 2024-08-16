import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';

export const ButtonDel = ({onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 50,
        backgroundColor: disabled ? 'gray' : 'red',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      disabled={disabled}
      onPress={onPress}>
      <Text style={{color: '#FFFFFF', fontSize: 20}}>Xóa</Text>
    </TouchableOpacity>
  );
};
