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
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';

const RouteList = ({navigation}) => {
  const [searchUsers, setSearchUser] = useState('');

  const {buses} = useSelector(state => state.bus);
  const {routes} = useSelector(state => state.route);
  const dispatch = useDispatch();

  const getData = async () => {
    await dispatch(getAllrouteData());
    await dispatch(getAllbusData());
  };

  useEffect(() => {
    getData();
  }, []);

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
          <View style={styles.viewLocation}>
            <Text style={styles.textLocation}> {item.start_point}</Text>
            <View></View>
          </View>
          <Text style={{fontSize: 16, color: '#000000'}}>---đến---{'>'}</Text>
          <View style={styles.viewLocation}>
            <View></View>
            <Text style={styles.textLocation}>{item.end_point}</Text>
          </View>
        </View>

        <View style={styles.viewText}>
          <Text style={[styles.textPlate, {color: '#0099FF'}]}>
            {item.departure_time}
          </Text>

          <Text style={{fontSize: 16, color: '#000000'}}>
            {' '}
            ---{item.total_time}---{'>'}
          </Text>
          <Text style={[styles.textPlate, {color: '#0099FF'}]}>16:30</Text>
        </View>

        <View style={styles.viewText}>
          <View>
            <Text style={styles.textDate}>
              Bắt đầu: {dayjs(item.start_date).format('DD/MM/YYYY')}
            </Text>
            <Text style={styles.textDate}>
              Kết thúc: {dayjs(item.end_date).format('DD/MM/YYYY')}
            </Text>
          </View>

          <Text style={styles.textPlate}>{item.date_interval} ngày / lần</Text>
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
          {/* Tìm từ khóa */}
          <Sreach onChangeText={setSearchUser} value={searchUsers} />

          {/* danh sách */}
          <FlatList
            data={routes}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item._id}
          />
          {console.log('ssss111111111111---------')}
          {console.log(routes[routes.length - 1])}
          {console.log('ssss----------------')}
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
    height: 250,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#C0C0C0',
    backgroundColor: '#FFFFEE',
  },
  textPlate: {
    alignSelf: 'center',
    fontWeight: '700',
    color: '#000000',
    fontSize: 22,
    padding: 5,
  },

  viewLocation: {
    fontWeight: '700',
    color: '#000000',
    fontSize: 22,
    height: 80,
    width: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },

  textLocation: {
    fontWeight: '700',
    color: '#000000',
    fontSize: 22,
  },

  textDate: {
    alignSelf: 'center',
    fontWeight: '500',
    color: '#000000',
    fontSize: 18,
    padding: 5,
  },

  viewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
