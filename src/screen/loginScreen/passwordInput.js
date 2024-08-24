import React, {Component, useState, useEffect} from 'react';
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
import {MyButton} from '../../components/button/myButton';
import {MyStatusBar} from '../../components/myStatusBar';
import {useSelector, useDispatch} from 'react-redux';
import {setRoles} from '../../redux/actions/authorization';
const windowHeight = Dimensions.get('window').height;

const PasswordInput = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const checkPassword = () => {
    console.log(password, user.password);
    if (password === user.password) {
      setIsValid(true);
      return true;
    }
    setIsValid(false);
    return false;
  };
  //   hide and show the password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setIsValid(true);
  }, [password]);

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
              Xin chào {user.name}
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

            <View style={{height: 20, width: '100%'}}>
              <Text style={{color: 'red'}}>
                {' '}
                {!isValid ? 'Mật khẩu không đúng !!' : ''}
              </Text>
            </View>
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
                console.log(user);

                if (checkPassword()) {
                  if (user.roles === 'admin') {
                    navigation.replace('AdminNav');
                    dispatch(setRoles('admin'));
                  } else {
                    navigation.replace('CustomerNav');
                    dispatch(setRoles('user'));
                  }
                }
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PasswordInput;
