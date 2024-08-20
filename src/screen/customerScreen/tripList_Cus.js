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

const TripList_Cus = ({navigation}) => {
  const {startLocation, endLocation, departure_date} = useSelector(
    state => state.location,
  );
  const {buses} = useSelector(state => state.bus);

  const dayNow = dayjs();
  const [start, setStart] = useState(startLocation);
  const [end, setEnd] = useState(endLocation);
  const [selectDate, setSelectDate] = useState(departure_date);

  const [trips, setTrips] = useState([]);
  const [seats, setSeats] = useState([]);
  const [oPenFinTrip, setOPenFinTrip] = useState(false);
  const dispatch = useDispatch();

  //---------------------------------------------gọi data---------------------------------------------

  //-----------------------------lọc lấy các trip có thời gian bắt đầu lớn hơn hiện tại 30 phút--------------
  const findTrip = trips => {
    if (
      departure_date.startOf('day').valueOf() ===
      dayNow.startOf('day').valueOf()
    ) {
      const newData = trips.find(trip => {
        return compareHourNow_Departure_time(trip.pickupTime);
      });

      return newData ? [newData] : [];
    } else {
      return trips;
    }
  };
  //-----------------------------sắp xếp theo thứ tự tăng dần--------------

  const sortTrips = data => {
    const sortedTrips = data.sort((a, b) => {
      const timeA = new Date(`2000-01-01T${a.pickupTime}:00Z`).getTime();
      const timeB = new Date(`2000-01-01T${b.pickupTime}:00Z`).getTime();

      return timeA - timeB;
    });
    setTrips(sortedTrips);
  };

  //---------------------------------------------gọi data---------------------------------------------

  const getBuses = async () => {
    await dispatch(getAllbusData());
  };

  const getSeat = async () => {
    const response = await getSeatByDate(departure_date.startOf('day'));
    setSeats(response);
  };

  const getTrip = async () => {
    const response = await getTripByDate_Start_End(
      departure_date.startOf('day'),
      startLocation,
      endLocation,
    );
    const data = findTrip(response);
    sortTrips(data);
  };

  useEffect(() => {
    getBuses();
  }, []);

  useEffect(() => {
    getTrip();
    getSeat();
  }, [departure_date, startLocation, endLocation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={
          !oPenFinTrip ? 'rgba(0, 0, 0, 0)' : myColor.headerColor
        }
        barStyle="light-content"
        translucent={true}
      />
      <View style={styles.containerImg}>
        <Image
          source={require('../../assets/images/night-city.jpg')}
          style={styles.img}
        />
      </View>
      {/*-----------------------------------------------MODAL---------------------------------------------------- */}

      <Modal animationType="slide" transparent={true} visible={oPenFinTrip}>
        <View
          style={styles.containerModal}
          onPress={() => {
            setSelectDate(departure_date);
            setStart(startLocation);
            setEnd(endLocation);
            setOPenFinTrip(false);
          }}>
          {/*------------------ header modal---------- */}
          <View style={styles.headerModal}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 20,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setOPenFinTrip(false);
              }}>
              <Image
                style={{width: 16, height: 16, tintColor: '#FFFFFF'}}
                source={require('../../assets/images/angle-left.png')}
              />
            </TouchableOpacity>
            <Text style={{color: '#FFF', fontSize: 16}}>Chỉnh sửa</Text>
          </View>

          {/*------------------body---------- */}
          <View style={styles.bodyModal}>
            <FindTrip
              startLocation={start}
              setStartLocation={setStart}
              endLocation={end}
              setEndLocation={setEnd}
              date={selectDate}
              setDate={setSelectDate}
              onPress={() => {
                dispatch(selectStartPoint(start));
                dispatch(selectEndPoint(end));
                dispatch(selectDateAction(selectDate));
                setOPenFinTrip(false);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              setOPenFinTrip(false);
              setSelectDate(departure_date);
              setStart(startLocation);
              setEnd(endLocation);
            }}
            style={{flex: 1}}
          />
        </View>
      </Modal>

      {/* ------------------------------------------------Container ------------------------------------------------*/}
      <View style={{flex: 1}}>
        {/* ------------------------hiển thị nút và tên địa điểm  ------------------------------------------------*/}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{width: 16, height: 16, tintColor: myColor.buttonColor}}
              source={require('../../assets/images/angle-left.png')}
            />
          </TouchableOpacity>

          <View style={styles.viewProvince}>
            <TouchableOpacity
              style={styles.btnProvince}
              onPress={() => {
                setOPenFinTrip(true);
              }}>
              <Text style={styles.textProvince}>{startLocation}</Text>
            </TouchableOpacity>

            <Image
              style={{width: 22, height: 22, tintColor: '#FFFFFF'}}
              source={require('../../assets/images/arrow-right.png')}
            />
            <TouchableOpacity
              onPress={() => {
                setOPenFinTrip(true);
              }}
              style={[styles.btnProvince, {alignItems: 'flex-end'}]}>
              <Text style={styles.textProvince}>{endLocation}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ------------------------------------------------danh sách vé ------------------------------------------------*/}
        <View style={{flex: 1}}>
          {/* ------------------------header chọn ngày ------------------------*/}

          <View style={styles.headerTrip}>
            <View style={{width: '95%', alignSelf: 'center'}}>
              <HeaderTripList
                date={departure_date}
                setDate={date => {
                  if (
                    date.startOf('day').valueOf() >=
                      dayNow.startOf('day').valueOf() &&
                    date.startOf('day').valueOf() <=
                      dayNow.add(30, 'day').startOf('day').valueOf()
                  ) {
                    dispatch(selectDateAction(date));
                    setSelectDate(date);
                  }
                }}
                minDate={dayNow.startOf('day')}
                maxDate={dayNow.add(30, 'day')}
              />
            </View>
          </View>

          {/* -------------------------danh sách------------------------*/}

          <View style={styles.containerList}>
            <FlatList
              data={trips}
              renderItem={({item}) => {
                const seat = seats.find(seat => {
                  return seat._id === item.seat_id;
                });

                return (
                  <ItemTrip
                    item={item}
                    seat={seat}
                    onPress={() => {
                      navigation.navigate('SelectSeats', {trip: item, seat});
                    }}
                  />
                );
              }}
              keyExtractor={item => item._id}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //  ------------------------Modal ------------------------
  containerModal: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
  },
  headerModal: {
    width: '100%',
    height: 50,
    backgroundColor: myColor.headerColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyModal: {
    backgroundColor: '#FAFAFA',
    paddingTop: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  //  ------------------------Container ------------------------
  containerImg: {
    width: '100%',
    height: 200,
    position: 'absolute',
    zIndex: -1,
  },

  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },

  containerScroll: {
    backgroundColor: '#000000',
    height: '100%',
  },

  header: {
    marginVertical: 40,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnBack: {
    backgroundColor: '#FFFFFF',
    height: 40,
    width: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewProvince: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnProvince: {
    width: '40%',
  },
  textProvince: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  //  ------------------------danh sachs ve ------------------------
  headerTrip: {
    backgroundColor: myColor.headerColor,
    height: 100,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  containerList: {
    flex: 1,
    marginTop: -20,
    backgroundColor: '#cbd5d6',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});

export default TripList_Cus;
