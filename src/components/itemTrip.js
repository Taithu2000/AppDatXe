import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {myColor} from '../constants/myColor';
import {useSelector} from 'react-redux';
const ItemTrip = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.tripContainer} onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.hederItem}>
          <Text style={styles.nameBus}>giường nằm 34 chỗ</Text>
          <Text style={styles.emptySeat}>Còn 34 chỗ trống</Text>
        </View>
        <View style={styles.timeItem}>
          <Text style={styles.time}>10:45</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '15%'}}>
            <View style={styles.circleTime}></View>
            <View style={styles.lineTime}></View>
          </View>

          <Text style={{fontSize: 18, color: '#007ce8'}}>10:45</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '15%'}}>
            <View style={styles.lineTime}></View>
            <View style={styles.circleTime1}></View>
          </View>
          <Text style={styles.time}>10:45</Text>
        </View>

        <View style={styles.locationItem}>
          <View style={{width: '45%'}}>
            <Text style={styles.textLocation}>điểm đón</Text>
          </View>
          <View
            style={{
              width: '45%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Text style={styles.textLocation}>điểm trả</Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: 50,
            marginTop: 15,
          }}>
          <View style={styles.semicircleLeft}></View>
          <View style={styles.semicircleRight}></View>

          <View style={styles.footerItem}>
            <View style={{height: 20, width: 55}}>
              <Text style={{bottom: 0, position: 'absolute', color: '#000000'}}>
                Giá vé:{' '}
              </Text>
            </View>
            <Text style={styles.textMoney}>350.000đ</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: '90%',
    margin: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFEE',
  },

  hederItem: {
    flexDirection: 'row',
    width: '90%',
    height: 45,
    borderBottomWidth: 1,
    borderColor: '#C0C0C0',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameBus: {
    color: '#000000',
    fontSize: 14,
    width: '45%',
  },

  emptySeat: {
    fontSize: 18,
    color: '#002aff',
  },
  timeItem: {
    height: 50,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleTime: {
    height: 10,
    width: 10,
    backgroundColor: myColor.headerColor,
    borderRadius: 10,
  },
  circleTime1: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: myColor.headerColor,
  },

  lineTime: {
    width: '70%',
    backgroundColor: myColor.headerColor,
    height: 2,
  },

  time: {
    fontSize: 24,
    fontWeight: '700',
    color: '#002aff',
  },

  locationItem: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textLocation: {
    fontSize: 18,
    color: '#000000',
  },

  footerItem: {
    width: '90%',
    borderTopWidth: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderStyle: 'dashed',
  },

  textMoney: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  semicircleLeft: {
    width: 12,
    height: 24,
    backgroundColor: '#000',
    position: 'absolute',
    top: -12,
    left: 0,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: myColor.containerColor,
  },

  semicircleRight: {
    width: 12,
    height: 24,
    backgroundColor: myColor.containerColor,
    position: 'absolute',
    top: -12,
    right: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex: 1,
  },
});

export default ItemTrip;
