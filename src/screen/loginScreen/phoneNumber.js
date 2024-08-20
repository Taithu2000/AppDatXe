import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {MyInput} from '../../components/myTextInput';
import {MyButton} from '../../components/button/myButton';
import {MyStatusBar} from '../../components/myStatusBar';
import {getUserByPhone} from '../../redux/actions/userAction';
import {useDispatch, useSelector} from 'react-redux';

const windowHeight = Dimensions.get('window').height;

const PhoneNumber = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setValidPhone] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const [error, setError] = useState(null);

  const verifyPhoneNumber = phone => {
    if (!phone) return true;
    let regex = RegExp(/(^(0|84)[1-9]{1}[0-9]{8}$)/);
    return regex.test(phone);
  };

  const isButtonDisabled = () => {
    if (!isValidPhone || phoneNumber.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  // Check phone number
  const checkPhoneNumber = phone => {
    if (user && user.phoneNumber) {
      return user.phoneNumber === phone;
    }
    return false;
  };

  const clickbtn = async () => {
    setIsLoading(true);
    const err = await dispatch(getUserByPhone(phoneNumber));
    setError(err);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading && !error) {
      if (checkPhoneNumber(phoneNumber)) {
        navigation.navigate('PasswordInput');
      } else {
        navigation.navigate('NameInput', {phoneNumber});
      }
    }
  }, [user, isLoading, error]);

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
              onPress={clickbtn}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PhoneNumber;
