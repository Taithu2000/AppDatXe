import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import {myColor} from '../../constants/myColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {IconSteps} from '../../components/iconSteps';
import SeatSelection22 from '../../components/seat/22seats';
import SeatSelection40 from '../../components/seat/40seats';
import {MyButton} from '../../components/button/myButton';

import {useSelector, useDispatch} from 'react-redux';
import FindTrip from '../../components/findTrip';
import HeaderTripList from '../../components/header/headerTripList';
import ItemTrip from '../../components/itemFlatList/itemTrip';
import {getAllbusData} from '../../redux/actions/busAction';
import {getTripByDate_Start_End} from '../../api/tripsAPI';
import {getSeatByDate} from '../../api/seat';
import dayjs from 'dayjs';
import {
  selectStartPoint,
  selectEndPoint,
  selectDateAction,
} from '../../redux/actions/locationAction';
import {compareHourNow_Departure_time} from '../../constants/formatHH-mm';

const SelectSeats = ({navigation, route}) => {
  const {trip, seat} = route.params;

  const [selectSeat, setSelectSeat] = useState([]);
  console.log(selectSeat);
  const a = true;
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
  }, []);

  console.log(seat);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={'rgba(0, 0, 0, 0)'}
        barStyle="light-content"
        translucent={true}
      />

      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          height: 75,
          backgroundColor: myColor.headerColor,
        }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            position: 'absolute',
            paddingTop: StatusBar.currentHeight + 10,
            marginLeft: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/images/arrow-small-left.png')}
            style={{width: 40, height: 40, tintColor: '#FFFFFF'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#FFFFFF',
            alignSelf: 'center',
            paddingTop: 15,
            fontSize: 20,
            fontFamily: fontFamilies.Medium,
          }}>
          Chọn ghế
        </Text>
      </View>

      <ScrollView>
        <IconSteps />

        <View style={styles.nodeSeat}>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.node, {backgroundColor: '#CCC'}]} />
            <Text style={styles.textNode}>Đã bán</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={[styles.node, {backgroundColor: 'green'}]} />
            <Text style={styles.textNode}>Đang chọn</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.node]} />
            <Text style={styles.textNode}>Còn trống</Text>
          </View>
        </View>
        {/*---------------------------- hiển thị giao diện chọn ghế ------------------------------ */}
        <View style={{marginBottom: 80}}>
          {seat.total_seats > 22 ? (
            <SeatSelection40
              seat={seat}
              selectSeat={selectSeat}
              setSelectSeat={setSelectSeat}
            />
          ) : (
            <SeatSelection22
              seat={seat}
              selectSeat={selectSeat}
              setSelectSeat={setSelectSeat}
            />
          )}
        </View>
      </ScrollView>
      {selectSeat != 0 && (
        <View style={[styles.bottomView]}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: '#000000'}}>Vị trí: </Text>
              <Text style={{fontSize: 20, color: 'green', fontWeight: '700'}}>
                {selectSeat.length > 0
                  ? selectSeat
                      .map(seat => {
                        return seat.name;
                      })
                      .join(', ')
                  : ''}
              </Text>
            </View>
            <Text style={{fontSize: 20, color: '#000000', fontWeight: '700'}}>
              {selectSeat.length > 0
                ? `${(selectSeat.length * trip.ticket_price)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`
                : '0'}
            </Text>
          </View>

          <View style={{width: 100}}>
            <MyButton
              nameBtn={'Tiếp tục'}
              onPress={() => {
                navigation.navigate('SelectPickUpAndDropOff', {
                  trip,
                  seat,
                  selectSeat,
                });
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nodeSeat: {
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
  },
  node: {
    height: 25,
    width: 25,
    borderWidth: 1,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  textNode: {
    color: '#000000',
    marginLeft: 10,
    fontSize: 15,
  },

  bottomView: {
    position: 'absolute',
    height: 100,
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
  },
});

export default SelectSeats;
