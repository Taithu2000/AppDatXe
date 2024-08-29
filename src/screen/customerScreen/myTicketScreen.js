import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {getAllrouteData} from '../../redux/actions/routeAction';
import {getAllbusData} from '../../redux/actions/busAction';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {customStyles} from '../../constants/customStyles';
import {getAllTicketByUserId} from '../../api/ticketApi';
import SkeletonTicket from '../../components/skeleton/skeletonItemTicket';
import NoDataComponent from '../../components/noDataComponent';

const windowWidth = Dimensions.get('window').width;

const MyTicketScreen = ({navigation}) => {
  const CURRENT = 'CURRENT';
  const DEPARTED = 'DEPARTED';
  const [page, setPage] = useState(CURRENT);

  const timeNow = dayjs();
  const [isLoading, setIsLoading] = useState(false);

  const {buses} = useSelector(state => state.bus);
  const {routes} = useSelector(state => state.route);
  const {user} = useSelector(state => state.user);

  const dispatch = useDispatch();

  const [tickets, setTickets] = useState([]);
  const [ticketCurrents, setTicketCurrents] = useState([]);
  const [ticketDeparted, setTicketDeparted] = useState([]);
  const [index, setIndex] = useState(0);

  const stepCarousel = useRef();

  useEffect(() => {
    if (page === CURRENT) {
      stepCarousel.current.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      });
    }

    if (page === DEPARTED) {
      stepCarousel.current.scrollTo({
        x: windowWidth,
        y: 0,
        animated: true,
      });
    }
  }, [page]);

  useEffect(() => {
    if (index === 1) {
      setPage(DEPARTED);
    }
    if (index === 0) {
      setPage(CURRENT);
    }
  }, [index]);
  //---------------------------------------------hiển thị bottom tab---------------------------------------------
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({tabBarStyle: customStyles.bottomTab});
    }, [navigation]),
  );
  //---------------------------------------------gọi data--------------------------------------------

  const getDataRouteAndBus = async () => {
    await dispatch(getAllrouteData());
    await dispatch(getAllbusData());
  };

  useEffect(() => {
    getDataRouteAndBus();
  }, []);

  const getDataTicket = async () => {
    setIsLoading(true);
    try {
      const data = await getAllTicketByUserId(user._id);

      //sắp xếp theo vé đặt mới nhất
      const sortTicket = data.sort((a, b) => {
        return dayjs(b.create_date) - dayjs(a.create_date);
      });
      setTickets(sortTicket);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log('Lỗi lấy dữ liệu');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getDataTicket();
    }, [navigation]),
  );

  //---------------------------------Lọc lấy danh sách vé hiện tại
  const filterTicketCurrent = () => {
    const dataCurrent = tickets.filter(ticket => {
      const route = routes.find(r => r._id === ticket.route_id);
      const dateTime = dayjs(ticket.departure_time);
      const [startHours, startMinutes] = route.departure_time
        .split(':')
        .map(Number);
      const [totalHours, totalMinutes] = route.total_time
        .split(':')
        .map(Number);

      const allMinutes =
        startHours * 60 + startMinutes + totalHours * 60 + totalMinutes;

      const end_time = dateTime.add(allMinutes, 'minute');

      return timeNow.valueOf() <= end_time.valueOf();
    });

    setTicketCurrents(dataCurrent);
  };

  //---------------------------------Lọc lấy danh sách vé đã đi
  const filterTicketDeparted = () => {
    const dataCurrent = tickets.filter(ticket => {
      const route = routes.find(r => r._id === ticket.route_id);
      const dateTime = dayjs(ticket.departure_time);
      const [startHours, startMinutes] = route.departure_time
        .split(':')
        .map(Number);
      const [totalHours, totalMinutes] = route.total_time
        .split(':')
        .map(Number);

      const allMinutes =
        startHours * 60 + startMinutes + totalHours * 60 + totalMinutes;

      const end_time = dateTime.add(allMinutes, 'minute');

      return timeNow.valueOf() > end_time.valueOf();
    });

    setTicketDeparted(dataCurrent);
  };

  useEffect(() => {
    if (routes && buses) filterTicketCurrent();
    filterTicketDeparted();
  }, [tickets]);

  // ----------------------------------------------------------------ITEM  FLASLIT----------------------------------------------------------------
  const Item = ({ticket}) => {
    const route = useMemo(() => {
      return routes.find(r => r._id === ticket.route_id);
    }, [ticket.route_id]);
    const bus = useMemo(() => {
      return buses.find(bus => {
        return bus._id === route.bus_id;
      });
    }, [route.bus_id]);

    return (
      <View style={styles.containerItem}>
        <TouchableOpacity
          style={styles.containerBody}
          onPress={() => {
            navigation.navigate('TicketDetails', {
              ticket,
              route,
              user,
            });
          }}>
          <View style={styles.column1}>
            <Text style={{fontSize: 16}}>Khởi hành</Text>
            <Text style={styles.textTime}>{ticket.pickupTime}</Text>
            <Text style={{fontSize: 16}}>
              {' '}
              {dayjs(ticket.departure_time).format('dddd')}
            </Text>
            <Text style={styles.textItem}>
              {dayjs(ticket.departure_time).format('DD/MM/YYYY')}
            </Text>
            <Text style={{height: 10}} />
            <Text style={{fontSize: 16}}>Trạng thái</Text>
            <Text style={styles.textItem}>
              {ticket.status == 'paid' ? 'Đã thanh toán' : 'Đã hủy'}
            </Text>
          </View>

          <View style={styles.lineItem}></View>

          <View style={styles.column2}>
            <Text style={{fontSize: 16}}>Biển số xe</Text>
            <Text style={styles.textTime}>{bus ? bus.license_plate : ''}</Text>
            <Text style={{fontSize: 16}}>Ghế</Text>
            <Text style={styles.textItem}>
              {ticket.seats
                .map(s => {
                  return s.name;
                })
                .join(', ')}
            </Text>
            <Text style={{height: 10}} />
            <Text style={{fontSize: 16}}>Lộ trình</Text>
            <Text
              style={
                styles.textItem
              }>{`${ticket.pickup} - ${ticket.drop_off}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleScroll = e => {
    if (!e) {
      return;
    }
    const {nativeEvent} = e;
    if (nativeEvent && nativeEvent.contentOffset) {
      const currentOffset = nativeEvent.contentOffset.x;

      if (currentOffset > 0) {
        setIndex(Math.floor((currentOffset + windowWidth / 2) / windowWidth));
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />

      <View style={{flex: 1}}>
        {/* Phần tiêu đề header */}
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
            height: 160,
            backgroundColor: myColor.headerColor,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'center',
            }}>
            <Text style={styles.textHeader}>Vé của tôi</Text>
          </View>
        </View>

        {/* Danh sách khách hàng */}
        <View style={styles.container}>
          <View style={styles.page}>
            <TouchableOpacity
              style={[
                styles.btnPage,
                {backgroundColor: page === CURRENT ? '#FFFFFF' : '#e8bb7b'},
              ]}
              onPress={() => {
                setPage(CURRENT);
              }}>
              <Text
                style={[
                  styles.textbtnPage,
                  {color: page === CURRENT ? myColor.iconcolor : '#000000'},
                ]}>
                Hiện tại
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnPage,
                {backgroundColor: page === DEPARTED ? '#FFFFFF' : '#e8bb7b'},
              ]}
              onPress={() => {
                setPage(DEPARTED);
              }}>
              <Text
                style={[
                  styles.textbtnPage,
                  {color: page === DEPARTED ? myColor.iconcolor : '#000000'},
                ]}>
                Đã đi
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={stepCarousel}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            onScroll={handleScroll}>
            <View style={styles.containerFlatList}>
              <View style={{width: windowWidth}}>
                {isLoading && <SkeletonTicket />}

                {!isLoading && (
                  <FlatList
                    data={ticketCurrents}
                    renderItem={({item}) => <Item ticket={item} />}
                    keyExtractor={item => item._id}
                    ListFooterComponent={
                      <View
                        style={{height: 100}}
                        showsVerticalScrollIndicator={false}
                      />
                    }
                  />
                )}

                {ticketCurrents.length == 0 && !isLoading && (
                  <NoDataComponent
                    source={require('../../assets/images/user-roadmap.png')}
                    content={'Bạn chưa có hành trình nào sắp tới'}
                  />
                )}
              </View>
              <View style={{width: windowWidth}}>
                {isLoading && <SkeletonTicket />}
                {!isLoading && (
                  <FlatList
                    data={ticketDeparted}
                    renderItem={({item}) => <Item ticket={item} />}
                    keyExtractor={item => item._id}
                    ListFooterComponent={
                      <View
                        style={{height: 100}}
                        showsVerticalScrollIndicator={false}
                      />
                    }
                  />
                )}

                {ticketDeparted.length == 0 && !isLoading && (
                  <NoDataComponent
                    source={require('../../assets/images/user-roadmap.png')}
                    content={'Bạn chưa có hành trình nào '}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyTicketScreen;

const styles = StyleSheet.create({
  // --------------------item-------------------

  containerItem: {
    height: 240,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 30,
    elevation: 5,
    backgroundColor: '#FFE4B5',
    marginTop: 20,
  },
  containerBody: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFFFEE',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  column1: {
    width: '35%',
    height: '100%',
  },
  textItem: {
    fontSize: 18,
    color: '#000000',
  },
  textTime: {
    fontSize: 25,
    color: '#000000',
    fontWeight: '700',
  },
  lineItem: {
    height: '100%',
    width: 2,
    backgroundColor: '#999999',
  },

  column2: {
    width: '65%',
    height: '100%',
    paddingLeft: 10,
  },
  // --------------------screen-------------------

  container: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -60,
    zIndex: 1,
    backgroundColor: myColor.containerColor,
  },

  textHeader: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  btnAdd: {width: 50, height: 50, position: 'absolute', right: 20},

  page: {
    marginTop: 20,
    width: '95%',
    height: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#e8bb7b',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
  },

  btnPage: {
    height: 35,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  textbtnPage: {
    color: '#000000',
    fontSize: 18,
  },

  containerFlatList: {width: 2 * windowWidth, flexDirection: 'row'},
  viewNoData: {
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    marginTop: 120,
  },
  imgData: {
    tintColor: '#00BFFF',
    margin: 20,
    width: 100,
    height: 100,
  },
});
