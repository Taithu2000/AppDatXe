import React, {Component, useState} from 'react';
import {SafeAreaView, View, Image, Text, StatusBar} from 'react-native';
import {customStyles} from '../../constants/style';
import {MyStatusBar} from '../../components/myStatusBar';
const Splash = ({navigation}) => {
  useState(() => {
    setTimeout(() => {
      navigation.replace('PhoneNumber');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <View
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/images/Bus.png')}
          style={{resizeMode: 'stretch', width: '80%', height: '30%'}}
        />
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text
            style={{
              fontFamily: 'PottaOne-Regular',
              fontSize: 60,
              color: '#FF9900',
            }}>
            Phi Vu
          </Text>
          <Text style={{}}>Đặt vé xe online</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Splash;
