import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {IconSteps} from '../../components/iconSteps';
import {MyButton} from '../../components/button/myButton';
import HeaderScreen from '../../components/header/headerScreen';
import {useSelector} from 'react-redux';

const OrderInformation = ({navigation, route}) => {
  const {trip, seat, selectSeat, selectPickup, selectDropOff} = route.params;
  const {user} = useSelector(state => state.user);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phoneNumber);
  const [note, setNote] = useState('');

  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  //check số điện thoại
  const verifyPhoneNumber = phone => {
    if (!phone) return true;
    let regex = RegExp(/(^(0|84)[1-9]{1}[0-9]{8}$)/);

    return regex.test(phone);
  };

  const verifyAll = () => {
    let flag = true;
    if (!name) {
      setValidName(false);
      flag = false;
    }
    if (!phone || !verifyPhoneNumber(phone)) {
      setValidPhone(false);
      flag = false;
    }
    return flag;
  };

  //   --------------------------------------------Tắt bottomtab------------------------------------------------
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={'rgba(0, 0, 0, 0)'}
        barStyle="light-content"
        translucent={true}
      />
      <HeaderScreen
        navigation={navigation}
        header={'Thông tin người đặt chỗ'}
      />
      <IconSteps iconLocation={true} iconUser={true} />

      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.boxInput}>
          <Image
            style={styles.iconImg}
            source={require('../../assets/images/user2.png')}
          />
          <View style={{width: '80%', padding: 5}}>
            <Text> Họ và tên</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập họ tên"
              value={name}
              onChangeText={text => {
                setName(text);
                setValidName(true);
              }}
            />
          </View>
        </View>
        <Text style={styles.textValid}>
          {validName ? '' : 'Tên không đúng định dạng!'}
        </Text>

        <View style={styles.boxInput}>
          <Image
            style={styles.iconImg}
            source={require('../../assets/images/user2.png')}
          />
          <View style={{width: '80%', padding: 5}}>
            <Text> Số điện thoại</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập số điện thoại"
              value={phone}
              onChangeText={text => {
                setPhone(text);
                setValidPhone(true);
              }}
            />
          </View>
        </View>
        <Text style={styles.textValid}>
          {validPhone ? '' : ' Số điện thoại không đúng định dạng!'}
        </Text>

        <View style={[styles.boxInput]}>
          <Image
            style={styles.iconImg}
            source={require('../../assets/images/user2.png')}
          />
          <View style={{width: '80%', padding: 5}}>
            <Text> Ghi chú</Text>
            <TextInput
              style={[styles.textInput, {}]}
              placeholder="Nhập ghi chú "
              value={note}
              onChangeText={text => {
                setNote(text);
              }}
            />
          </View>
        </View>
        <View style={styles.boxBtn}>
          <MyButton
            nameBtn={'Tiếp tục'}
            onPress={() => {
              if (verifyAll()) {
                navigation.navigate('PaymentScreen', {
                  trip,
                  seat,
                  selectSeat,
                  selectPickup,
                  selectDropOff,
                  name,
                  phone,
                  note,
                });
              }
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxInput: {
    backgroundColor: '#DDDDDD',
    height: 60,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImg: {
    width: 30,
    height: 30,
    tintColor: 'blue',
    margin: 10,
  },
  textInput: {
    fontSize: 18,

    width: '100%',
    height: 40,
  },
  textValid: {
    color: 'red',
    fontSize: 14,
    margin: 10,
    marginLeft: 50,
  },
  boxBtn: {
    width: '90%',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default OrderInformation;
