import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import WheelPicker from 'react-native-wheely';
import {myColor} from '../../constants/myColor';
import {RadioButton} from 'react-native-paper';

const DialogSelect = ({
  visible,
  title,
  checked,
  setChecked,
  text0,
  text1,
  onPressCancel,
  onPressBtn,
  colorBtn,
  textBtn,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 300,
            width: '60%',
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
          }}>
          {/* }Header ---------------------------------*/}

          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: myColor.headerColor,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22, color: '#FFFFFF'}}>{title}</Text>
          </View>

          {/* ---------------------------------Radio button 1 ---------------------------------*/}

          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '80%',
                marginTop: 20,
              }}>
              <RadioButton
                color={myColor.buttonColor}
                value={0}
                status={checked === 0 ? 'checked' : 'unchecked'}
                onPress={() => setChecked(0)}
              />
              <TouchableOpacity
                style={{width: '80%'}}
                onPress={() => setChecked(0)}>
                <Text style={{fontSize: 18, color: '#000000'}}>{text0}</Text>
              </TouchableOpacity>
            </View>

            {/* {/* ---------------------------------Radio button  2---- */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '80%',
                marginTop: 20,
              }}>
              <RadioButton
                color={myColor.buttonColor}
                value={1}
                status={checked === 1 ? 'checked' : 'unchecked'}
                onPress={() => setChecked(1)}
              />
              <TouchableOpacity
                style={{width: '80%'}}
                onPress={() => setChecked(1)}>
                <Text style={{fontSize: 18, color: '#000000'}}>{text1}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ---------------------------------Footer btn--------------------------------- */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',

              alignItems: 'center',
              width: '100%',
              position: 'absolute',
              height: 50,
              bottom: 0,
            }}>
            <TouchableOpacity
              style={{
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderRadius: 10,
                backgroundColor: myColor.buttonColor,
              }}
              onPress={onPressCancel}>
              <Text style={{fontSize: 18, color: '#FFFFFF'}}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                {
                  width: '45%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: colorBtn,
                },
              ]}
              onPress={onPressBtn}>
              <Text style={{fontSize: 18, color: '#FFFFFF'}}>{textBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DialogSelect;
