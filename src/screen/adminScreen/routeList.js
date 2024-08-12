import React, {Component, useEffect, useState, useCallback} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {Sreach} from '../../components/search';
import {getAllrouteData} from '../../redux/actions/routeAction';
import {getAllbusData} from '../../redux/actions/busAction';
import {selectRoute} from '../../redux/actions/routeAction';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import ItemRoute from '../../components/itemRoute';

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

  //---------------------------------------------hiển thị bottom tab---------------------------------------------
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({tabBarStyle: {display: undefined}});
    }, [navigation]),
  );

  //---------------------------------------------gọi data--------------------------------------------

  const getData = async () => {
    await dispatch(getAllrouteData());
    await dispatch(getAllbusData());
  };

  useEffect(() => {
    getData();
  }, []);

  //---------------------------------------------lọc dữ liệu --------------------------------------------

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
            backgroundColor: myColor.containerColor,
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
              <ItemRoute
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
});
