import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {myColor} from '../../constants/myColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {IconSteps} from '../../components/iconSteps';
import {MyButton} from '../../components/button/myButton';

const user = {
  name: 'Thu',
  phoneNumber: '0456681747',
};

const OrderInformation = ({navigation, route}) => {
  const {trip, seat, selectSeat, selectPickup, selectDropOff} = route.params;
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phoneNumber);
  const [node, setNode] = useState('');

  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
console.log(selectPickup)
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
          Thông tin người đặt chỗ
        </Text>
      </View>
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
              value={node}
              onChangeText={text => {
                setNode(text);
              }}
            />
          </View>
        </View>
        <View style={styles.boxBtn}>
          <MyButton
            nameBtn={'Tiếp tục'}
            onPress={() => {
              if (verifyAll()) {
                console.log('a');
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
