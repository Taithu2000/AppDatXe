import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {myColor} from '../../constants/myColor';
import {calculateEndTime} from '../../constants/formatHH-mm';
import {useSelector} from 'react-redux';
const ItemTrip = ({item, seat, onPress}) => {
  const {buses} = useSelector(state => state.bus);

  // lấy tên xe thông qua  route_id
  const NameByBusId = (busId, buses) => {
    const bus = buses.find(bus => bus._id == busId);
    return bus ? bus.type : '';
  };

  return (
    <TouchableOpacity style={styles.tripContainerItem} onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.hederItem}>
          <Text style={styles.nameBus}>{`${NameByBusId(item.bus_id, buses)} ${
            seat ? seat.total_seats : ''
          } chỗ`}</Text>
          <Text style={styles.emptySeat}>
            {seat
              ? seat.available_seats == 0
                ? 'Hết chỗ'
                : `Còn ${seat.available_seats} chỗ trống`
              : 'không chỗ'}
          </Text>
        </View>
        <View style={styles.timeItem}>
          <Text style={styles.time}>{item.pickupTime}</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '15%'}}>
            <View style={styles.circleTime}></View>
            <View style={styles.lineTime}></View>
          </View>

          <Text style={{fontSize: 18, color: '#007ce8'}}>{item.totalTime}</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '15%'}}>
            <View style={styles.lineTime}></View>
            <View style={styles.circleTime1}></View>
          </View>
          <Text style={styles.time}>
            {calculateEndTime(item.pickupTime, item.totalTime)}
          </Text>
        </View>

        <View style={styles.locationItem}>
          <View style={{width: '45%'}}>
            <Text style={styles.textLocation}>{item.pickup}</Text>
          </View>
          <View
            style={{
              width: '45%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Text style={styles.textLocation}>{item.drop_off}</Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: 40,
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
            <Text style={styles.textMoney}>
              {`${item.ticket_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  tripContainerItem: {
    width: '100%',
  },

  itemContainer: {
    width: '95%',
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
    width: '55%',
    textAlign: 'right',
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
    height: 45,
  },

  textLocation: {
    fontSize: 18,
    color: '#000000',
  },

  footerItem: {
    width: '90%',
    borderTopWidth: 1,
    height: 40,
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
    left: -1,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#cbd5d6',
  },

  semicircleRight: {
    width: 12,
    height: 24,
    backgroundColor: '#cbd5d6',
    position: 'absolute',
    top: -12,
    right: -1,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex: 1,
  },
});

export default ItemTrip;
