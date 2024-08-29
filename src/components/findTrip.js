import React, {Component, useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {myColor} from '../constants/myColor';
import {MyButton} from './button/myButton';
import SelectProvince from '../screen/customerScreen/selectProvince';
import MyCalendarFull from './calendar/myCalendarFull';
import dayjs from 'dayjs';

const maxDate = dayjs().add(30, 'day');

const FindTrip = ({
  startLocation,
  setStartLocation,
  endLocation,
  setEndLocation,
  date,
  setDate,
  onPress,
}) => {
  const [oPenModalStart, setOPenModalStart] = useState(false);
  const [oPenModalEnd, setOPenModalEnd] = useState(false);
  const [oPenCalendar, setOPenCalendar] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

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
          <Text style={styles.textLocation}>
            {date.format('dddd, DD/MM/YYYY')}
          </Text>
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

      <MyCalendarFull
        visible={oPenCalendar}
        minDate={dayjs().startOf('day')}
        maxDate={maxDate}
        date={selectDate}
        onChange={params => {
          setSelectDate(params.date);
        }}
        onPressbtnLater={() => {
          setOPenCalendar(false);
        }}
        onPressbtnSelect={() => {
          setDate(selectDate);
          setOPenCalendar(false);
        }}
      />

      <View style={{width: '90%', marginTop: 30}}>
        <MyButton onPress={onPress} nameBtn={'Tìm chuyến đi'} />
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
    elevation: 10,
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
