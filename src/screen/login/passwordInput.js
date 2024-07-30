import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import {MyInput} from '../../components/myTextInput';
import {MyButton} from '../../components/myButton';
import {MyStatusBar} from '../../components/myStatusBar';

const windowHeight = Dimensions.get('window').height;

const PasswordInput = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //   hide and show the password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <View
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: windowHeight * 0.65,
            width: '100%',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/pesionHello.png')}
            style={{
              resizeMode: 'stretch',
              width: '60%',
              height: '35%',
              marginTop: 10,
            }}
          />
          <View style={{alignItems: 'center', width: '80%', marginTop: 50}}>
            <Text
              style={{
                fontSize: 25,
                color: '#000',
                textAlign: 'center',
                fontFamily: 'PottaOne-Regular',
                paddingBottom: 10,
              }}>
              Xin chào
            </Text>

            {/* Input Password */}
            {/* Input Password */}

            <MyInput
              imageLeftSoure={require('../../assets/images/password-smartphone.png')}
              placeholderText={'Nhập mật khẩu...'}
              onchangeText={text => {
                setPassword(text);
              }}
              value={password}
              imageRightSoure={
                showPassword
                  ? require('../../assets/images/eye-crossed.png')
                  : require('../../assets/images/eye.png')
              }
              onPress={() => {
                toggleShowPassword();
              }}
              isSecureTextEntry={!showPassword}
            />

            {/* Quên mật khẩu */}
            {/* Quên mật khẩu */}

            <View
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={{height: 50, justifyContent: 'center'}}>
                <Text style={{color: '#000'}}>Quên mật khẩu?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{height: 50, justifyContent: 'center'}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={{color: '#000'}}>Không phải tôi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Button nhấn tiếp tục */}
        {/* Button nhấn tiếp tục */}
        <View style={{width: '80%', flex: 1}}>
          <View
            style={{
              width: '100%',
              bottom: 20,
              position: 'absolute',
            }}>
            <MyButton
              nameBtn={'Đăng nhập'}
              onPress={() => {
                console.log('Press');
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PasswordInput;
