import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {myColor} from '../constants/myColor';
import MyCaledarFull from './myCaledarFull';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/vi';
dayjs.extend(utc);
dayjs.locale('Vi');

const HeaderTripList = ({date, setDate, onPress}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleNextDay = () => {
    setDate(date.add(1, 'day'));
  };

  const handlePrevDay = () => {
    setDate(date.subtract(1, 'day'));
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          setIsVisibleModal(true);
        }}>
        <Image
          source={require('../assets/images/daily-calendar.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* hiển thị lịch */}
      <MyCaledarFull
        visible={isVisibleModal}
        date={selectedDate}
        onChange={params => {
          setSelectedDate(params.date);
        }}
        onPressbtnLater={() => {
          setIsVisibleModal(false);
        }}
        onPressbtnSelect={() => {
          setIsVisibleModal(false);
          setDate(selectedDate.utc().startOf('day').add(1, 'day'));
        }}
      />

      <TouchableOpacity onPress={handlePrevDay}>
        <Image
          source={require('../assets/images/angle-double-small-left.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.textDate}>{date.format('dddd, DD/MM/YYYY')}</Text>

      <TouchableOpacity onPress={handleNextDay}>
        <Image
          source={require('../assets/images/angle-double-small-right.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPress}>
        <Image
          source={require('../assets/images/multiple.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  //----------------------------------------------------------------

  header: {
    width: '100%',
    height: 60,
    backgroundColor: myColor.headerColor,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    tintColor: '#FFFFFF',
  },
  textDate: {color: '#FFFFFF', fontSize: 18},
});

export default HeaderTripList;
