import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const NoDataComponent = ({source, content}) => {
  return (
    <View style={styles.viewNoData}>
      <Image style={styles.imgData} source={source} />

      <Text style={{fontSize: 18}}>{content}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  viewNoData: {
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    marginTop: 120,
  },
  imgData: {
    tintColor: '#2fd6c3',
    margin: 20,
    width: 100,
    height: 100,
  },
});

export default NoDataComponent;
