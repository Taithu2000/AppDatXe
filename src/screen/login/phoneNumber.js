import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import {MyInput} from '../../components/myTextInput';
import {MyButton} from '../../components/myButton';
import {MyStatusBar} from '../../components/myStatusBar';
import {TextInput} from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height;

const PhoneNumber = ({navigation}) => {
  const user = [
    {
      phone: '0356681747',
      name: 'Võ Tài Thu',
      pass: '123456',
    },
    {
      phone: '0389912147',
      name: 'Lên Văn Đức',
      pass: '123456',
    },
    {
      phone: '0334567890',
      name: 'Nguyễn Thị Thảo',
      pass: '123456',
    },
  ];

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setValidPhone] = useState(true);

  const verifyPhoneNumber = phone => {
    if (!phone) return true;
    let regex = RegExp(
      /(^(0|84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$)/,
    );

    return regex.test(phone);
  };

  const isButtonDisabled = () => {
    if (!isValidPhone || phoneNumber.length == 0) {
      return true; // Button sẽ bị vô hiệu hóa
    } else {
      return false; // Button sẽ không bị vô hiệu hóa
    }
  };

  // Check phone number
  const checkPhoneNumber = phone => {
    return user.some(user => user.phone == phone);
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
            source={require('../../assets/images/busImg.png')}
            style={{
              resizeMode: 'stretch',
              width: '60%',
              height: '45%',
              marginTop: 20,
            }}
          />
          <View style={{alignItems: 'center', width: '80%', marginTop: 20}}>
            <View
              style={{
                height: 90,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#000',
                  textAlign: 'center',
                  fontFamily: 'PottaOne-Regular',
                  paddingBottom: 20,
                }}>
                Nhà xe Phi Vũ kính chào quý khách
              </Text>
            </View>

            {/* Input Số điện thoại */}
            {/* Input Số điện thoại */}

            <MyInput
              imageLeftSoure={require('../../assets/images/phone-call.png')}
              placeholderText={'Nhập số điện thoại...'}
              keyboardType={'numeric'}
              onchangeText={text => {
                setPhoneNumber(text);
                setValidPhone(verifyPhoneNumber(text));
              }}
              value={phoneNumber}
              imageRightSoure={require('../../assets/images/circle-xmark.png')}
              onPress={() => {
                setPhoneNumber('');
                setValidPhone(true);
              }}
            />
            <View style={{width: '100%', height: 30}}>
              <Text style={{color: 'red', height: 30}}>
                {isValidPhone ? '' : 'Số điện thoại không hợp lệ !'}
              </Text>
            </View>
          </View>
        </View>

        <View style={{width: '80%', flex: 1}}>
          <View
            style={{
              width: '100%',
              bottom: 20,
              position: 'absolute',
            }}>
            {/* Button nhấn tiếp tục */}

            <MyButton
              nameBtn={'Tiếp tục'}
              isDisabled={isButtonDisabled()}
              onPress={() => {
                if (checkPhoneNumber(phoneNumber)) {
                  navigation.navigate('PasswordInput');
                } else {
                  navigation.navigate('NameInput');
                }
                setPhoneNumber('');
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PhoneNumber;
