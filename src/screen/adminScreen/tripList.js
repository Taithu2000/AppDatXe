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
import ItemTrip from '../../components/itemFlatList/itemTrip';
import HeaderTripList from '../../components/header/headerTripList';
import {useSelector} from 'react-redux';
import {getTripByRouteIdAndDate} from '../../api/tripsAPI';
import {getSeatByRouteIdandDate} from '../../api/seat';
import SkeletonTicket from '../../components/skeleton/skeletonItemTicket';
import NoDataComponent from '../../components/noDataComponent';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.extend(utc);
dayjs.locale('vi');
const TripList = ({navigation}) => {
  const {route} = useSelector(state => state.route);
  const [date, setDate] = useState(dayjs().startOf('day'));
  const [trips, setTrips] = useState([]);
  const [seat, setSeat] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  //gọi data lấy danh sách trip
  const getDataTripAndSeat = async () => {
    setIsLoading(true);
    try {
      const dataTrip = await getTripByRouteIdAndDate(route._id, date);
      setTrips(dataTrip);
      const dataSeat = await getSeatByRouteIdandDate(route._id, date);
      setSeat(dataSeat);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataTripAndSeat();
  }, [date]);

  useFocusEffect(
    useCallback(() => {
      getDataTripAndSeat();
    }, [navigation]),
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

      <View style={styles.flatListContainer}>
        {isLoading && <SkeletonTicket />}
        {!isLoading && (
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
        )}
        {trips.length == 0 && !isLoading && (
          <NoDataComponent
            source={require('../../assets/images/train-journey.png')}
            content={'Không có lộ trình cho ngày này'}
          />
        )}
      </View>
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
