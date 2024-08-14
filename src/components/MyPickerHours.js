import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import WheelPicker from 'react-native-wheely';
import {myColor} from '../constants/myColor';

const MyPickerHours = ({
    visible,
  selectedIndex,
  options,
  onChange,
  onPressCancel,
  onPressSelect,
}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalCaledar}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width: '60%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}>
          <View
            style={{
              backgroundColor: myColor.headerColor,
              width: '100%',
              height: 50,
              position: 'absolute',
              top: 0,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#FFFFFF',
                fontSize: 18,
                marginTop: 10,
              }}>
              Chọn giờ
            </Text>
          </View>

          <WheelPicker
            selectedIndex={selectedIndex}
            itemStyle
            itemTextStyle={{color: 'black', fontSize: 20}}
            containerStyle={{
              width: 100,
              fontsize: 20,
            }}
            selectedIndicatorStyle={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              width: 100,
              fontsize: 20,
            }}
            visibleRest={1}
            options={options}
            onChange={onChange}
          />

          <View
            style={{
              width: '100%',
              height: 50,
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={styles.btnCalendar}
              onPress={onPressCancel}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  fontSize: 18,
                }}>
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCalendar}
              onPress={onPressSelect}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#FFFFFF',
                  fontSize: 18,
                }}>
                Chọn
              </Text>
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

export default MyPickerHours;
