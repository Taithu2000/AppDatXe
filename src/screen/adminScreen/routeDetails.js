import React, {Component, useEffect, useState, useMemo, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {MyButton} from '../../components/myButton';
import {ButtonDel} from '../../components/buttonDel';
import axios from 'axios';
import {DeletetDialog} from '../../components/mydialog';
import {useSelector, useDispatch} from 'react-redux';
import {deleteRouteData} from '../../redux/actions/routeAction';
import {deleteSeatByDates} from '../../api/seat';
import RouteUpdate from './routeUpdate';
import dayjs from 'dayjs';

const RouteDetails = ({navigation}) => {
  const {route} = useSelector(state => state.route);
  const {buses} = useSelector(state => state.bus);

  const dispatch = useDispatch();

  const date = useRef(new Date()).current;

  const [isVisibleDel, setIsVisibleDel] = useState(false);

  const [validModal, setValidModal] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  // ẩn botttom tab
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
    return () => {
      parent?.setOptions({tabBarStyle: undefined});
    };
  }, [navigation]);

  //kiểm tra date để ẩn hoặc hiện button sửa
  const checkDate = () => {
    if (
      new Date(dayjs(route.end_date).format('YYYY-MM-DD')).getTime() <
      new Date(dayjs(date).format('YYYY-MM-DD')).getTime()
    ) {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    checkDate();
  }, []);

  // lấy biển số thông qua id
  const getLicensePlateByBusId = (busId, buses) => {
    const bus = buses.find(bus => bus._id == busId);
    return bus ? bus.license_plate : '';
  };

  //----------------------------------------------------Xóa route //----------------------------------------------------
  const deleteRouter = async () => {
    await deleteSeatByDates(
      route._id,
      new Date(dayjs(new Date()).format('YYYY-MM-DD')),
    );
    const response = await dispatch(deleteRouteData(route._id));

    if (response) {
      ToastAndroid.show('Xóa thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Không thể xóa, thử lại sau !', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <RouteUpdate validModal={validModal} setValidModal={setValidModal} />

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
          Thông tin tuyến đường
        </Text>
      </View>

      {/* -------------------------------------------BODY----------------------------- */}

      <View style={styles.busContainer}>
        <View style={styles.rowView}>
          <View style={{width: '100%'}}>
            <Text style={styles.textPlate}>
              {getLicensePlateByBusId(route.bus_id, buses)}
            </Text>
          </View>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.text, {color: '#555555'}]}>Nơi xuất phát</Text>

          <Text style={styles.text}>{route.start_point}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.text, {color: '#555555'}]}>Nơi đến</Text>

          <Text style={styles.text}>{route.end_point}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.text, {color: '#555555'}]}>Ngày bắt đầu</Text>

          <Text style={styles.text}>
            {dayjs(route.start_date).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.text, {color: '#555555'}]}>Ngày kết thúc</Text>

          <Text style={styles.text}>
            {dayjs(route.end_date).format('DD/MM/YYYY')}
          </Text>
        </View>

        <View style={styles.rowView}>
          <Text style={[styles.text, {color: '#555555'}]}>Giờ xuất phát</Text>

          <Text style={styles.text}>{route.departure_time}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.text, {color: '#555555'}]}>
            Thời gian di chuyển
          </Text>

          <Text style={styles.text}>{route.total_time}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={[styles.text, {color: '#555555'}]}>Số ngày / tuyến</Text>

          <Text style={styles.text}>{route.date_interval}</Text>
        </View>

        {/* ------------------------------------Button Chỉnh sửa-------------------------------------------------------------- */}

        <View style={styles.viewbtn}>
          <View style={{width: '60%'}}>
            <MyButton
              nameBtn={'Chỉnh sửa'}
              isDisabled={isDisabled}
              onPress={() => {
                setValidModal(true);
              }}
            />
          </View>

          {/* ------------------------------------Button Xoa-------------------------------------------------------------- */}

          <View style={{width: '30%'}}>
            <ButtonDel
              onPress={() => {
                setIsVisibleDel(true);
              }}
            />

            <DeletetDialog
              title={'Xóa thông tin tuyến đường'}
              description={
                'Bạn có muốn xóa thông tin tuyến đường này? Lộ trình những ngày tiếp theo cũng sẽ bị xóa!'
              }
              visible={isVisibleDel}
              onCancel={() => {
                setIsVisibleDel(false);
              }}
              onDelete={async () => {
                await deleteRouter();
                setIsVisibleDel(false);
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RouteDetails;

const styles = StyleSheet.create({
  busContainer: {
    flex: 1,
    alignItems: 'center',
  },

  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  imageBus: {
    width: '40%',
    height: 150,
    resizeMode: 'stretch',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#C0C0C0',
  },
  textPlate: {
    fontSize: 25,
    color: '#000000',
    fontWeight: '700',
    alignSelf: 'center',
  },

  text: {
    fontSize: 20,
    color: '#000000',
  },

  viewbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    position: 'absolute',
    bottom: 50,
  },
});
