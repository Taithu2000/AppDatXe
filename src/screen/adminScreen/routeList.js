import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {Sreach} from '../../components/search';
import {getAllrouteData} from '../../redux/actions/routeAction';
import {getAllbusData} from '../../redux/actions/busAction';
import {selectRoute} from '../../redux/actions/routeAction';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';

const RouteList = ({navigation}) => {
  const ACTIVE = 'ACTIVE';
  const STOPPED = 'STOPPED';
  const [page, setPage] = useState(ACTIVE);
  const [searchUsers, setSearchUser] = useState('');

  const [date, setDate] = useState(
    new Date(dayjs(new Date()).format('YYYY-MM-DD')),
  );

  const {buses} = useSelector(state => state.bus);
  const {routes} = useSelector(state => state.route);
  const dispatch = useDispatch();

  const [newRoutes, setNewRoutes] = useState(routes);

  const getData = async () => {
    await dispatch(getAllrouteData());
    await dispatch(getAllbusData());
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filterRoutes = () => {
      const data = routes.filter(route => {
        if (page === ACTIVE) {
          return (
            new Date(dayjs(route.end_date).format('YYYY-MM-DD')).getTime() >=
            date.getTime()
          );
        } else {
          return (
            new Date(dayjs(route.end_date).format('YYYY-MM-DD')).getTime() <
            date.getTime()
          );
        }
      });
      setNewRoutes(data);
    };
    filterRoutes();
  }, [routes, page]);

  // ----------------------------------------------------------------ITEM  FLASLIT----------------------------------------------------------------

  // lấy biển số thông qua id
  const getLicensePlateByBusId = (busId, buses) => {
    const bus = buses.find(bus => bus._id == busId);
    return bus ? bus.license_plate : '';
  };

  const Item = ({item, onPress}) => (
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
            <Text style={[styles.textPlate, {color: '#0099FF'}]}>16:30</Text>

            <Text style={[styles.textPlate, {color: '#0099FF'}]}>16:30</Text>
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
            <Text style={styles.textHeader}>Tuyến đường</Text>
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={() => {
                navigation.navigate('AddRoute');
              }}>
              <Image
                source={require('../../assets/images/addroute.jpg')}
                style={{width: 40, height: 40, borderRadius: 50}}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Danh sách khách hàng */}
        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -60,
            zIndex: 1,
            backgroundColor: '#FAFAFA',
          }}>
          <View style={styles.page}>
            <TouchableOpacity
              style={[
                styles.btnPage,
                {backgroundColor: page === ACTIVE ? '#FFFFFF' : '#e8bb7b'},
              ]}
              onPress={() => {
                setPage(ACTIVE);
              }}>
              <Text
                style={[
                  styles.textbtnPage,
                  {color: page === ACTIVE ? myColor.iconcolor : '#000000'},
                ]}>
                Hoạt động
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnPage,
                {backgroundColor: page === STOPPED ? '#FFFFFF' : '#e8bb7b'},
              ]}
              onPress={() => {
                setPage(STOPPED);
              }}>
              <Text
                style={[
                  styles.textbtnPage,
                  {color: page === STOPPED ? myColor.iconcolor : '#000000'},
                ]}>
                Đã ngừng
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tìm từ khóa */}
          <Sreach onChangeText={setSearchUser} value={searchUsers} />

          {/* danh sách */}
          <FlatList
            data={newRoutes}
            renderItem={({item}) => (
              <Item
                item={item}
                onPress={() => {
                  dispatch(selectRoute(item));
                  navigation.navigate('RouteDetails');
                }}
              />
            )}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RouteList;

const styles = StyleSheet.create({
  textHeader: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  btnAdd: {width: 50, height: 50, position: 'absolute', right: 20},

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
  },

  page: {
    marginTop: 5,
    width: '90%',
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
