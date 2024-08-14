import React, {Component, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ItemTrip from '../../components/itemTrip';
import HeaderTripList from '../../components/headerTripList';
import {useSelector} from 'react-redux';
import {getTripByRouteIdAndDate} from '../../api/tripsAPI';
import {getSeatByRouteIdandDate} from '../../api/seat';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.extend(utc);
dayjs.locale('vi');
const TripList = ({navigation}) => {
  const {route} = useSelector(state => state.route);
  const [date, setDate] = useState(dayjs().utc().startOf('day'));
  const [trips, setTrips] = useState([]);
  const [seat, setSeat] = useState({});

  //gọi data lấy danh sách trip
  const getDataTrip = async () => {
    const data = await getTripByRouteIdAndDate(route._id, date);
    setTrips(data);
  };
  const getDataSeat = async () => {
    const data = await getSeatByRouteIdandDate(route._id, date);
    setSeat(data);
  };
  useFocusEffect(
    useCallback(() => {
      getDataTrip();
      getDataSeat();
      console.log('trip:', trips, 'seat \n', seat);
    }, [date]),
  );

  return (
    <View style={styles.tripContainer}>
      <HeaderTripList
        date={date}
        setDate={setDate}
        onPress={() => {
          navigation.navigate('TripAdd');
        }}
      />

      {trips.length === 0 ? (
        <View style={[styles.flatListContainer, {justifyContent: 'center'}]}>
          <Image
            source={require('../../assets/images/train-journey.png')}
            style={styles.imageData}
          />

          <Text style={{fontSize: 16, alignSelf: 'center'}}>
            Hôm nay không có lộ trình!
          </Text>
        </View>
      ) : (
        <View style={styles.flatListContainer}>
          <FlatList
            data={trips}
            renderItem={({item}) => (
              <ItemTrip
                item={item}
                seat={seat}
                onPress={() => {
                  navigation.navigate('TripDetails', {item});
                }}
              />
            )}
            keyExtractor={item => item._id}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  //----------------------------------------------------------------
  tripContainer: {
    flex: 1,
  },

  flatListContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#cbd5d6',
  },

  imageData: {
    width: 60,
    height: 60,
    margin: 10,
    alignSelf: 'center',
    tintColor: '#2fd6c3',
  },
});

export default TripList;
