import React, {Component, isValidElement, useState} from 'react';
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
import {useRoute} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const NameInput = ({route, navigation}) => {
  const {phoneNumber} = route.params;
  const [name, setName] = useState('');
  const [isValidName, setValidName] = useState(true);

  const verifyName = name => {
    // Cắt khoảng trống ở đầu và cuối chuỗi

    if (name == '' || name.length > 1) {
      return true;
    }
    return false;
  };

  const isButtonDisabled = () => {
    if (!isValidName || name.length == 0) {
      return true; // Button sẽ bị vô hiệu hóa
    } else {
      return false; // Button sẽ không bị vô hiệu hóa
    }
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
          {/* --------------------------------Ảnh chính------------------------------- */}

          <Image
            source={require('../../assets/images/your-name.png')}
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
                Tên bạn là gì ?
              </Text>
            </View>

            {/* Input Số điện thoại */}
            {/* Input Số điện thoại */}

            <MyInput
              imageLeftSoure={require('../../assets/images/user.png')}
              placeholderText={'Nhập tên của bạn...'}
              onchangeText={text => {
                setName(text.replace(/^\s+/, ''));
                setValidName(verifyName(text));
              }}
              value={name}
              imageRightSoure={require('../../assets/images/circle-xmark.png')}
              onPress={() => {
                setName('');
                setValidName(true);
              }}
            />
            <View style={{height: 30, width: '100%'}}>
              <Text
                style={{
                  color: 'red',
                  height: 30,
                }}>
                {isValidName ? '' : 'Tên không hợp lệ !'}
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
                navigation.navigate('NewPassword', {phoneNumber, name});
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default NameInput;
