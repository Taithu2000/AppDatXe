import React, {useState, useEffect, useCallback} from 'react';
import {Text, Image, TouchableOpacity, Modal} from 'react-native';

const DialogNotify = ({visible, setVisible}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setVisible(false);
        }}
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
            source={require('../../assets/images/land-mine-on.png')}
            style={{width: 50, height: 50, marginTop: 40, tintColor: 'red'}}
          />
          <Text
            style={{
              marginTop: 30,
              fontSize: 20,
              color: '#000000',
              fontWeight: '700',
            }}>
            Lỗi
          </Text>
          <Text
            style={{
              width: '80%',
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Số ghế bạn chọn vượt quá số lượng cho phép !
          </Text>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 50,
              borderTopWidth: 1,
              borderColor: '#CCCCCC',
            }}>
            <Text style={{fontSize: 20, color: '#000000'}}>Đóng</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
export default DialogNotify;
