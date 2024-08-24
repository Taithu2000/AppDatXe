import React from 'react';
import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import {myColor} from '../../constants/myColor';
import {fontFamilies} from '../../constants/fontFamilies';

const HeaderScreen = ({navigation, header}) => {
  return (
    <View>
      <View
        style={{
          height: StatusBar.currentHeight,

          backgroundColor: myColor.headerColor,
        }}></View>

      <View
        style={{
          height: 50,
          backgroundColor: myColor.headerColor,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            position: 'absolute',
            marginLeft: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/images/arrow-small-left.png')}
            style={{width: 40, height: 40, tintColor: '#FFFFFF'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#FFFFFF',
            alignSelf: 'center',
            fontSize: 20,
            fontFamily: fontFamilies.Medium,
          }}>
          {header}
        </Text>
      </View>
    </View>
  );
};
export default HeaderScreen;
