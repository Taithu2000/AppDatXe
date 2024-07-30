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

const NewPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showcfPass, setShowCfPass] = useState(false);

  const [isvaluePass, setValuePass] = useState(true);

  // kiểm tra tính hợp lệ của mật khảu
  const verifyPassword = password => {
    if (!password) return true;
    let regex = new RegExp(/^(?!.*s).{6,}$/);
    return regex.test(password);
  };

  //   hide and show the password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPass = () => {
    setShowCfPass(!showcfPass);
  };

  // không cho phép nhấn button hoặc ngược lại
  const isButtonDisabled = () => {
    if (isvaluePass && password.length > 0 && confirmPassword.length > 5)
      return false;
    else {
      return true;
    }
  };

  //so sánh password

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <View
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          alignItems: 'center',
        }}>
        {/* Trở mà màn hình trước */}
        {/* Trở mà màn hình trước */}

        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            marginTop: StatusBar.currentHeight + 10,
            zIndex: 1,
            left: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/images/arrow-small-left.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>

        {/* ---------------------------------------------------------------------------- */}
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
              placeholderText={'Mật khẩu mới...'}
              onchangeText={text => {
                setPassword(text);
                setValuePass(verifyPassword(text));
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
            <View style={{width: '100%', height: 30}}>
              <Text style={{color: 'red', height: 30}}>
                {isvaluePass ? '' : 'Phải từ 6 kí tự !'}
              </Text>
            </View>

            {/* Input confirm Password */}
            {/* Input confirm Password */}

            <MyInput
              imageLeftSoure={require('../../assets/images/password-smartphone.png')}
              placeholderText={'Nhập lại mật khẩu...'}
              onchangeText={text => {
                setConfirmPassword(text);
              }}
              value={confirmPassword}
              imageRightSoure={
                showcfPass
                  ? require('../../assets/images/eye-crossed.png')
                  : require('../../assets/images/eye.png')
              }
              onPress={() => {
                toggleShowConfirmPass();
              }}
              isSecureTextEntry={!showcfPass}
            />
          </View>
        </View>

        <View style={{width: '80%', flex: 1}}>
          <View
            style={{
              width: '100%',
              bottom: 20,
              position: 'absolute',
            }}>
            <MyButton
              nameBtn={'Xác nhận'}
              isDisabled={isButtonDisabled()}
              onPress={() => {
                if (password === confirmPassword) {
                  console.log('Password OK:', password);
                }
                else{
                  console.log('Password không khớpF');

                }
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default NewPassword;
