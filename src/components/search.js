import React from 'react';
import {TouchableOpacity, View, TextInput, Image} from 'react-native';

export const Search = ({onPress, onChangeText, value}) => {
  return (
    <View
      style={{
        width: '80%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <TextInput
        style={{
          height: 40,
          width: '100%',
          borderWidth: 1,
          alignSelf: 'center',
          borderRadius: 20,
          borderColor: '#ccc',
          paddingLeft: 20,
          fontSize: 16,
          paddingRight: 50,
          backgroundColor: '#FFFFFF',
        }}
        onChangeText={onChangeText}
        value={value}
        placeholder="Nhập từ khóa"></TextInput>
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: 10,
        }}
        onPress={onPress}>
        <Image
          source={require('../assets/images/search.png')}
          style={{width: 25, height: 25, tintColor: '#696969'}}
        />
      </TouchableOpacity>
    </View>
  );
};
