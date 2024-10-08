import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {myColor} from '../../constants/myColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {fetchDataProvince} from '../../api/location';
export const MyButton = ({onPress, nameBtn, isDisabled}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 50,
        backgroundColor: isDisabled ? '#CCC' : myColor.buttonColor,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
      disabled={isDisabled}>
      <Text
        style={{
          color: myColor.textBtnColor,
          fontFamily: fontFamilies.Medium,
          fontSize: 20,
        }}>
        {nameBtn}
      </Text>
    </TouchableOpacity>
  );
};
