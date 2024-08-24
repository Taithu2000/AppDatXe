import React, {useState, useEffect, useCallback} from 'react';
import {Text, Image, TouchableOpacity, Modal, View} from 'react-native';
import {myColor} from '../../constants/myColor';

const DialogNotifyOK_Cancel = ({
  visible,
  source,
  title,
  content,
  onPressCancel,
  onPress,
}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: '80%',
            height: 250,
            backgroundColor: '#FAFAFA',
            borderRadius: 20,
            alignItems: 'center',
          }}>
          <Image
            source={source}
            style={{width: 60, height: 60, marginTop: 20}}
          />
          <Text
            style={{
              marginTop: 30,
              fontSize: 20,
              color: '#000000',
              fontWeight: '700',
            }}>
            {title}
          </Text>
          <Text
            style={{
              width: '80%',
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 16,
            }}>
            {content}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              position: 'absolute',
              bottom: 0,
            }}>
            <TouchableOpacity
              onPress={onPressCancel}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                height: 50,
                borderTopWidth: 1,
                borderColor: '#CCCCCC',
                borderRightWidth: 1,
              }}>
              <Text style={{fontSize: 20, color: '#000000'}}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPress}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                height: 50,
                borderTopWidth: 1,
                borderColor: '#CCCCCC',
              }}>
              <Text style={{fontSize: 20, color: myColor.buttonColor}}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
export default DialogNotifyOK_Cancel;
