import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import {myColor} from '../constants/myColor';

const MyCaledarFull = ({
  visible,
  minDate,
  maxDate,
  date,
  onChange,
  onPressbtnLater,
  onPressbtnSelect,
}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalCaledar}>
        <View style={styles.viewCaledar}>
          <DateTimePicker
            mode="single"
            locale={'vi'}
            headerContainerStyle={{
              backgroundColor: myColor.headerColor,
            }}
            headerTextStyle={{color: '#FFFFFF', fontSize: 18}}
            headerButtonColor={'#FFFFFF'}
            weekDaysTextStyle={{color: '#000000', fontSize: 16}}
            selectedItemColor={myColor.headerColor}
            //----------------------------------------------------------------
            minDate={minDate}
            maxDate={maxDate}
            date={date}
            onChange={onChange}
          />

          <View
            style={{
              marginBottom: 10,
              marginTop: -20,
              width: '95%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
            <TouchableOpacity
              style={styles.btnCalendar}
              onPress={onPressbtnLater}>
              <Text style={{color: '#FFFFFF', fontSize: 18}}>Để sau</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCalendar}
              onPress={onPressbtnSelect}>
              <Text style={{color: '#FFFFFF', fontSize: 18}}>Chọn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCaledar: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCaledar: {width: '90%', backgroundColor: '#FFF'},

  btnCalendar: {
    width: 80,
    height: 40,
    backgroundColor: myColor.buttonColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyCaledarFull;
