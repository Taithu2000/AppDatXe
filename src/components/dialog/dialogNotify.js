import React, {useState, useEffect, useCallback} from 'react';
import {Text, Image, TouchableOpacity, Modal} from 'react-native';

const DialogNotify = ({visible, source, title, content, onPress}) => {
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
          <TouchableOpacity
            onPress={onPress}
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
