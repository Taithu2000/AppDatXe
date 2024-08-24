import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {myColor} from '../../constants/myColor';
import {useSelector} from 'react-redux';
import {calculateEndTime} from '../../constants/formatHH-mm';
import dayjs from 'dayjs';
const ItemRoute = ({item, onPress}) => {
  const {buses} = useSelector(state => state.bus);

  // lấy biển số thông qua id
  const getLicensePlateByBusId = (busId, buses) => {
    const bus = buses.find(bus => bus._id == busId);
    return bus ? bus.license_plate : '';
  };

  return (
    <View style={styles.containerItem}>
      <TouchableOpacity onPress={onPress} style={styles.viewTouch}>
        <Text style={styles.textPlate}>
          {getLicensePlateByBusId(item.bus_id, buses)}
        </Text>
        <View style={styles.viewText}>
          <View style={styles.bodyLocation}>
            <View style={styles.viewIconLocation}>
              <Image
                source={require('../../assets/images/dot-circle.png')}
                style={styles.iconLocation}
              />
              <View
                style={{
                  height: '40%',
                  width: 3,
                  backgroundColor: myColor.headerColor,
                }}></View>

              <Image
                source={require('../../assets/images/marker.png')}
                style={styles.iconLocation}
              />
            </View>
            <View style={styles.viewLocation}>
              <Text style={styles.textLocation}>{item.start_point}</Text>
              <Text style={styles.textLocation}>{item.end_point}</Text>
            </View>
          </View>

          <View style={styles.viewTime}>
            <Text style={[styles.textPlate, {color: '#0099FF'}]}>
              {item.departure_time}
            </Text>

            <Text style={[styles.textPlate, {color: '#0099FF'}]}>
              {calculateEndTime(item.departure_time, item.total_time)}
            </Text>
          </View>
        </View>

        <View style={styles.line}></View>
        <View style={styles.footer}>
          <Image
            style={styles.iconLocation}
            source={require('../../assets/images/time-quarter-to.png')}
          />
          <Text style={styles.textfooter}> ~ {item.total_time} h</Text>

          <View style={{width: 30}}></View>
          <Image
            style={styles.iconLocation}
            source={require('../../assets/images/arrows-repeat.png')}
          />
          <Text style={styles.textfooter}>
            {' '}
            {item.date_interval} ngày / lần
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  containerItem: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewTouch: {
    width: '90%',
    marginTop: 10,
    height: 220,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#C0C0C0',
    backgroundColor: '#FFFFEE',
    elevation: 5,
  },

  textPlate: {
    alignSelf: 'center',
    fontWeight: '700',
    color: '#000000',
    fontSize: 22,
    padding: 5,
  },

  viewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  bodyLocation: {
    width: '75%',
    flexDirection: 'row',
    height: 100,
  },

  viewIconLocation: {
    height: '100%',
    width: '15%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
  },

  iconLocation: {
    width: 20,
    height: 20,
    tintColor: myColor.headerColor,
  },

  viewLocation: {
    height: '100%',
    width: '85%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 5,
  },

  textLocation: {
    fontWeight: '700',
    color: '#000000',
    fontSize: 22,
  },

  viewTime: {
    width: '25%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: 100,
  },

  textDate: {
    alignSelf: 'center',
    fontWeight: '500',
    color: '#000000',
    fontSize: 18,
    padding: 5,
  },

  line: {
    width: '90%',
    height: 2,
    backgroundColor: '#CCCCCC',
    alignSelf: 'center',
    margin: 20,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textfooter: {
    fontSize: 18,
    color: '#555555',
  },
});

export default ItemRoute;
