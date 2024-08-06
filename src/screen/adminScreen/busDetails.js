import React, {Component, useEffect, useState, useMemo, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {fontFamilies} from '../../constants/fontFamilies';
import DatePicker from 'react-native-date-picker';
import {MyButton} from '../../components/myButton';
import {ButtonDel} from '../../components/buttonDel';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {DeletetDialog} from '../../components/mydialog';
import {useSelector, useDispatch} from 'react-redux';
import {formatDateFromISOString} from '../../constants/formatDate';
import BusUpdate from './busUpdate';
import {deleteBus} from '../../redux/actions/busAction';

// import {IP} from '@env';

const IP = 'http://10.0.2.2:3306';

const CustomerDetails = ({navigation}) => {
  const {bus} = useSelector(state => state.bus);
  const dispatch = useDispatch();

  const date = useRef(new Date()).current;

  const [open, setOpen] = useState(false);

  const [ivalidDate, setIvalidDate] = useState(false);

  // const [isUpdated, setIsUpdated] = useState(false);

  const [isName, setIsName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);

  const [isVisibleDel, setIsVisibleDel] = useState(false);

  const [validModal, setValidModal] = useState(false);

  const deleteBusData = async () => {
    const response = await dispatch(deleteBus(bus._id));
    if (response) {
      ToastAndroid.show('Xóa thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Không thể xóa, thử lại sau !', ToastAndroid.SHORT);
    }
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
          Thông tin xe
        </Text>
      </View>

      {/* -------------------------------------------BODY----------------------------- */}

      <BusUpdate validModal={validModal} setValidModal={setValidModal} />

      <ScrollView>
        <View style={styles.busContainer}>
          <View style={styles.rowView}>
            <View style={{width: '60%'}}>
              <Text style={styles.textPlate}>{`${bus.license_plate}`}</Text>
            </View>
            <Image
              source={require('../../assets/images/Bus.png')}
              style={styles.imageBus}
            />
          </View>

          <View style={styles.rowView}>
            <Text style={[styles.text, {color: '#555555'}]}>
              Ngày đăng kiểm
            </Text>

            <Text style={styles.text}>
              {`${formatDateFromISOString(bus.registration_date)}`}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.text, {color: '#555555'}]}>Loại xe</Text>

            <Text style={styles.text}>{`${bus.type}`}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.text, {color: '#555555'}]}>Hãng xe</Text>

            <Text style={styles.text}>{`${bus.brand}`}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.text, {color: '#555555'}]}>Màu xe</Text>

            <Text style={styles.text}>{`${bus.color}`}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.text, {color: '#555555'}]}>Số ghế</Text>

            <Text style={styles.text}>{`${bus.num_Seats}`}</Text>
          </View>

          {/* ------------------------------------Button Xoa-------------------------------------------------------------- */}

          <View style={[styles.rowView, {marginTop: 40}]}>
            <View style={{width: '60%'}}>
              <MyButton
                nameBtn={'Chỉnh sửa'}
                onPress={() => {
                  setValidModal(true);
                }}
              />
            </View>

            {/* ------------------------------------Button Xoa-------------------------------------------------------------- */}

            <View style={{width: '30%'}}>
              <ButtonDel
                onPress={() => {
                  setIsVisibleDel(true);
                }}
              />

              <DeletetDialog
                title={'Xóa thông tin xe'}
                description={
                  'Bạn có muốn xóa thông tin xe này? Thông tin của cả lộ trình cũng sẽ bị xóa!'
                }
                visible={isVisibleDel}
                onCancel={() => {
                  setIsVisibleDel(false);
                }}
                onDelete={async () => {
                  deleteBusData();
                  setIsVisibleDel(false);
                  navigation.goBack();
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerDetails;

const styles = StyleSheet.create({
  busContainer: {
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
  },

  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 15,
  },
  imageBus: {
    width: '40%',
    height: 150,
    resizeMode: 'stretch',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#C0C0C0',
  },
  textPlate: {
    fontSize: 25,
    color: '#000000',
    fontWeight: '700',
    alignSelf: 'center',
  },

  text: {
    fontSize: 20,
    color: '#000000',
  },
});
