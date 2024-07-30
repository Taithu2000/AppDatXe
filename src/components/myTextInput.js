import React from 'react';
import {TextInput, View, Image, TouchableOpacity} from 'react-native';
import {myColor} from '../constants/myColor';
export const MyInput = ({
  imageLeftSoure,
  imageRightSoure,
  placeholderText,
  keyboardType,
  onchangeText,
  value,
  onPress,
  isSecureTextEntry,
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={imageLeftSoure}
        style={{
          width: 25,
          height: 25,
          position: 'absolute',
          color: '#000',
          zIndex: 1,
          left: 5,
          tintColor: myColor.iconcolor,
        }}
      />
      <TextInput
        style={{
          width: '100%',
          height: 50,
          backgroundColor: '#fff',
          paddingLeft: imageLeftSoure ? 40 : 10,
          paddingRight: imageRightSoure ? 50 : 10,
          borderRadius: 10,
          elevation: 5,
          fontSize: 18,
        }}
        keyboardType={keyboardType}
        placeholder={placeholderText}
        onChangeText={onchangeText}
        secureTextEntry={isSecureTextEntry}
        value={value}
      />
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          position: 'absolute',
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}>
        <Image
          source={imageRightSoure}
          style={{
            width: 25,
            height: 25,
            position: 'absolute',
            color: '#000',
            zIndex: 1,
            left: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
