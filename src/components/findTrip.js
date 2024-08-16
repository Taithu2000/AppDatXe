import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {customStyles} from '../constants/customStyles';
import {myColor} from '../constants/myColor';
import {MyStatusBar} from '../../components/myStatusBar';
import {useSelector} from 'react-redux';
import {MyButton} from '../components/myButton';
import SelectProvince from '../screen/customerScreen/selectProvince';
import MyCaledarFull from './myCaledarFull';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const maxDate = dayjs().add(30, 'day');

const FindTrip = () => {
  const [startLocation, setStartLocation] = useState('Đắk Lắk');
  const [endLocation, setEndLocation] = useState('Hồ Chí Minh');

  const [oPenModalStart, setOPenModalStart] = useState(false);
  const [oPenModalEnd, setOPenModalEnd] = useState(false);
  const [oPenCalendar, setOPenCalendar] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [selectDate, setSelectDate] = useState(new Date());
  // console.log(selectDate);
  // console.log(new Date("2024-08-15T17:00:00.000Z").getDate());
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
   console.log(date);
   
  return (
    <View style={styles.container}>
      <View style={styles.viewLocation}>
        <View style={styles.iconLocation}>
          <Image
            source={require('../assets/images/dot-circle.png')}
            style={styles.icon}
          />
          <View style={styles.lineIcon}></View>
          <Image
            source={require('../assets/images/marker.png')}
            style={styles.icon}
          />
        </View>

        <View style={styles.viewSelectLocation}>
          <TouchableOpacity
            onPress={() => {
              setOPenModalStart(true);
            }}
            style={[styles.btnLocation, styles.boderBottombtn]}>
            <Text>Nơi đi</Text>
            <Text style={styles.textLocation}>{startLocation}</Text>
          </TouchableOpacity>

          {/* --------------------------------------Mở modal chọn nơi đi*/}
          <SelectProvince
            visible={oPenModalStart}
            setVisible={setOPenModalStart}
            setValue={setStartLocation}
            title={'Chọn nơi bạn muốn khởi hành'}
          />

          <TouchableOpacity
            style={styles.btnLocation}
            onPress={() => {
              setOPenModalEnd(true);
            }}>
            <Text>Nơi đến</Text>
            <Text style={styles.textLocation}>{endLocation}</Text>
          </TouchableOpacity>
        </View>

        {/* --------------------------------------Mở modal chọn nơi đến*/}
        <SelectProvince
          visible={oPenModalEnd}
          setVisible={setOPenModalEnd}
          setValue={setEndLocation}
          title={'Chọn nơi bạn muốn đến'}
        />

        <TouchableOpacity
          style={styles.btnReverse}
          onPress={() => {
            const temp = startLocation;
            setStartLocation(endLocation);
            setEndLocation(temp);
          }}>
          <Image
            style={{width: 20, height: 20, tintColor: '#FFFFFF'}}
            source={require('../assets/images/exchange-alt.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.viewLocation, {height: 65, marginTop: 30}]}>
        <View style={styles.viewDate}>
          <Text>Ngày khởi hành</Text>
          <Text style={styles.textLocation}>Thứ năm,15/08/2024</Text>
        </View>
        <TouchableOpacity
          style={styles.btnReverse}
          onPress={() => {
            setOPenCalendar(true);
          }}>
          <Image
            style={{width: 20, height: 20, tintColor: '#FFFFFF'}}
            source={require('../assets/images/daily-calendar.png')}
          />
        </TouchableOpacity>
      </View>

      <MyCaledarFull
        visible={oPenCalendar}
        minDate={dayjs().subtract(1, 'day')}
        maxDate={maxDate}
        date={date}
        onChange={params => {
          setDate(params.date);
        }}
        onPressbtnLater={() => {
          setOPenCalendar(false);
        }}
        onPressbtnSelect={() => {
          setSelectDate(date);
          setOPenCalendar(false);
        }}
      />

      <View style={{width: '90%', marginTop: 30}}>
        <MyButton nameBtn={'Tìm chuyến đi'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: '100%',
    alignItems: 'center',
  },
  viewLocation: {
    width: '90%',
    borderRadius: 15,
    height: 130,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 5,
  },
  iconLocation: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    height: '80%',
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: myColor.buttonColor,
    margin: 5,
  },
  lineIcon: {
    width: 1,
    height: '40%',
    backgroundColor: myColor.headerColor,
  },

  viewSelectLocation: {
    width: '65%',
    height: '100%',
  },

  btnLocation: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
  },
  boderBottombtn: {
    borderBottomWidth: 1,
    borderColor: '#888888',
  },

  textLocation: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
  },

  btnReverse: {
    backgroundColor: myColor.buttonColor,
    height: 50,
    width: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewDate: {
    marginLeft: '15%',
    width: '65%',
  },
});

export default FindTrip;
