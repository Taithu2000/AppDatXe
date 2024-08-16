import React, {Component, useEffect, useState, useMemo, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {fontFamilies} from '../../constants/fontFamilies';
import DatePicker from 'react-native-date-picker';
import {MyButton} from '../../components/myButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {DeletetDialog} from '../../components/mydialogDelete';

import dayjs from 'dayjs';

// import {IP} from '@env';

const IP = 'http://10.0.2.2:3306';

const CustomerDetails = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const date = useRef(new Date()).current;

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmai] = useState(user.email);
  const [sex, setSex] = useState(user.sex);
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [password, setPassWord] = useState(user.password);

  // const [isUpdated, setIsUpdated] = useState(false);

  const [isName, setIsName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);

  const [isVisible, setIsVisible] = useState(false);

  const radioButtons = useMemo(
    () => [
      {
        id: 'male', // acts as primary key, should be unique and non-empty string
        label: 'Nam',
      },
      {
        id: 'female',
        label: '   Nữ',
      },
    ],
    [],
  );
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

  //-----------------------------gửi dữ liệu cập nhật thông tin-------------------------
  const updatedUser = async () => {
    const data = {
      name,
      password,
      email,
      sex,
      birthDate: dayjs(birthDate).format('YYYY-MM-DD'),
    };

    try {
      await axios.put(`${IP}/users/update/${user._id}`, data);
      ToastAndroid.show('Cập nhật thông tin thành công !', ToastAndroid.SHORT);
    } catch (e) {
      console.log('Lỗi cập nhật thông tin: ', e);
      ToastAndroid.show('Không thể cập nhật !', ToastAndroid.SHORT);
    }
  };

  //-----------------------------gửi dữ liệu xóa thông tin thông tin-------------------------

  const deleteUser = async () => {
    try {
      await axios.delete(`${IP}/users/delete/${phoneNumber}`);
      ToastAndroid.show('Xóa thành công !', ToastAndroid.SHORT);
    } catch (e) {
      console.log('Lỗi xóa user: ', e);
      ToastAndroid.show('Không thể xóa !', ToastAndroid.SHORT);
    }
  };

  //  kiểm tra tính hợp lệ email------------------kiểm tra tính hợp lệ email-------------kiểm tra tính hợp lệ email------------------
  const verifyEmail = email => {
    let regex = RegExp(
      /^(?:[a-z0-9!#$%&amp;'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    );

    return regex.test(email);
  };

  const verifyName = name => {
    return name.length > 1;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          height: 75,
          backgroundColor: myColor.headerColor,
        }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            position: 'absolute',
            paddingTop: StatusBar.currentHeight + 10,
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
            paddingTop: 15,
            fontSize: 20,
            fontFamily: fontFamilies.Medium,
          }}>
          Thông tin tài khoản
        </Text>
      </View>

      <KeyboardAwareScrollView>
        <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
          <Image
            source={require('../../assets/images/avatar-user.jpg')}
            style={{
              height: 90,
              width: 90,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
            }}
          />

          {/* Số điện thoại----------------------Số điện thoại------------Số điện thoại---------- */}

          <View style={{width: '90%', height: 50}}>
            <Text
              style={{
                bottom: 5,
                position: 'absolute',
                fontSize: 18,
                color: '#000000',
              }}>
              Số điện thoại
            </Text>
          </View>

          <View
            style={{
              width: '90%',
              height: 50,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: '#888888',
              color: '#000000',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 18, color: '#000000', paddingLeft: 15}}>
              {user.phoneNumber}
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              height: 30,
            }}></View>
          {/* Họ và tên--------------Họ và tên-----------------------Họ và tên--------- */}
          <View
            style={{
              width: '90%',
              height: 30,
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <Text
              style={{
                bottom: 5,
                position: 'absolute',
                fontSize: 18,
                color: '#000000',
              }}>
              Họ và tên
            </Text>
          </View>

          <TextInput
            style={{
              width: '90%',
              height: 50,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: '#888888',
              fontSize: 18,
              paddingLeft: 15,
            }}
            onChangeText={text => {
              setName(text);

              setIsName(true);
            }}
            value={name}
            placeholder="Họ và tên"
          />

          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              height: 30,
            }}>
            <Text style={{color: 'red'}}>
              {isName ? '' : 'Tên không đúng định dạng!'}
            </Text>
          </View>

          {/* Email------------------------------Email-----------------------Email------------ */}
          <View style={{width: '90%', height: 30, marginTop: 5}}>
            <Text
              style={{
                bottom: 5,
                position: 'absolute',
                fontSize: 18,
                color: '#000000',
              }}>
              Email
            </Text>
          </View>

          <TextInput
            style={{
              width: '90%',
              height: 50,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: '#888888',
              fontSize: 18,
              paddingLeft: 15,
            }}
            placeholder="Email"
            onChangeText={text => {
              setEmai(text);

              setIsEmail(true);
            }}
            value={email}
          />
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              height: 30,
            }}>
            <Text style={{color: 'red'}}>
              {isEmail ? '' : 'Email không đúng định dạng!'}
            </Text>
          </View>

          {/* Giới tính-------------------Giới tính-----------------Giới tính--------------- */}

          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 30,
              marginTop: 5,
            }}>
            <Text style={{fontSize: 18, color: '#000000'}}>Giới tính</Text>
            <Text
              style={{
                fontSize: 18,
                color: '#000000',

                position: 'absolute',
                left: '35%',
              }}>
              Ngày sinh
            </Text>
          </View>

          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 60,
            }}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSex}
              selectedId={sex}
            />

            {/* Ngày sinh------------------------------------------------------------------------ */}
            <View
              style={{
                width: '65%',
                height: 50,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: '#888888',
                color: '#000000',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                style={{fontSize: 18, color: '#000000', paddingLeft: 15}}
                value={dayjs(birthDate).format('DD/MM/YYYY')}
                placeholder="DD/MM/YYYY"
                editable={false}
              />

              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setOpen(true)}>
                <Image
                  source={require('../../assets/images/daily-calendar.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
            </View>

            {/* Lịch---------------------------- Lịch------------------------- Lịch----------------------- */}
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setBirthDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View
            style={{
              width: '90%',
              marginTop: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* Cập nhật tài khoản--------------------------Cập nhật tài khoản---------------------------- */}

            <View style={{width: '60%'}}>
              <MyButton
                nameBtn={'Cập nhật'}
                onPress={async () => {
                  setIsName(verifyName(name));
                  setIsEmail(verifyEmail(email));
                  if (isName && isEmail) {
                    await updatedUser();
                  }
                }}
              />
            </View>
            {/* Xóa tài khoản--------------------------Xóa tài khoản---------------------------- */}
            <View style={{width: '35%'}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 50,
                  borderWidth: 1,
                  backgroundColor: 'red',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setIsVisible(true);
                }}>
                <Text style={{color: '#FFFFFF', fontSize: 20}}>Xóa</Text>
              </TouchableOpacity>
            </View>

            {/* Thông báo xóa tài khoản-----------------Thông báo xóa tài khoản--------------------------- */}

            <DeletetDialog
              visible={isVisible}
              title={'Xóa tài khoản'}
              description={
                'Bạn có muốn xóa tài khoản này? Tài khoản sẽ bị xóa vĩnh viễn.'
              }
              onCancel={() => {
                setIsVisible(false);
              }}
              onDelete={() => {
                deleteUser();
                setIsVisible(false);
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CustomerDetails;
