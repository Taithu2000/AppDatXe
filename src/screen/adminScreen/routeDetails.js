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
import {MyButton} from '../../components/button/myButton';
import {ButtonDel} from '../../components/button/buttonDel';
import {DeletetDialog} from '../../components/dialog/dialogDelete';
import {useSelector, useDispatch} from 'react-redux';
import {deleteRouteData} from '../../redux/actions/routeAction';
import {deleteSeatByDates} from '../../api/seat';
import {
  deleteManyTripByGroupId,
  deleteManyTripByRouteId,
} from '../../api/tripsAPI';
import RouteUpdate from './routeUpdate';
import dayjs from 'dayjs';
import TripList from './tripList';
import TicketList from './ticketList';

const LIST_TICKET = 'LIST_TICKET';
const DETAILS = 'DETAILS';
const LIST_TRIP = 'LIST_TRIP';
const RouteDetails = ({navigation}) => {
  const [validModal, setValidModal] = useState(false);

  const [page, setPage] = useState(DETAILS);

  // ẩn botttom tab
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation]);

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

      <View
        style={{
          flex: 1,
          backgroundColor: myColor.containerColor,
        }}>
        <View style={styles.btnContainer}>
          <View style={{width: '33.333%'}}>
            <TouchableOpacity
              style={styles.btnPage}
              onPress={() => {
                setPage(LIST_TICKET);
              }}>
              <Text style={styles.textBtnPage}>Vé xe</Text>
            </TouchableOpacity>
            {page === LIST_TICKET ? (
              <View style={styles.lineBtnPage}></View>
            ) : (
              ''
            )}
          </View>

          <View style={{width: '33.333%'}}>
            <TouchableOpacity
              style={styles.btnPage}
              onPress={() => {
                setPage(DETAILS);
              }}>
              <Text style={styles.textBtnPage}>Chi tiết</Text>
            </TouchableOpacity>
            {page === DETAILS ? <View style={styles.lineBtnPage}></View> : ''}
          </View>

          <View style={{width: '33.333%'}}>
            <TouchableOpacity
              style={styles.btnPage}
              onPress={() => {
                setPage(LIST_TRIP);
              }}>
              <Text style={styles.textBtnPage}>Lộ trình</Text>
            </TouchableOpacity>
            {page === LIST_TRIP ? <View style={styles.lineBtnPage}></View> : ''}
          </View>
        </View>
        {page === DETAILS && (
          <Details setValidModal={setValidModal} navigation={navigation} />
        )}

        {page === LIST_TRIP && <TripList navigation={navigation} />}

        {page === LIST_TICKET && <TicketList navigation={navigation} />}
      </View>
    </SafeAreaView>
  );
};

{
  /* ------------------------------------------- PAGE chi tiết route----------------------------- */
  /* -------------------------------------------PAGE chi tiết route----------------------------- */
  /* ------------------------------------------- PAGE chi tiết route----------------------------- */
}

const Details = ({setValidModal, navigation}) => {
  const {route} = useSelector(state => state.route);
  const {buses} = useSelector(state => state.bus);

  const dispatch = useDispatch();

  const date = useRef(new Date()).current;

  const [isVisibleDel, setIsVisibleDel] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  // lấy biển số thông qua id
  const getLicensePlateByBusId = (busId, buses) => {
    const bus = buses.find(bus => bus._id == busId);
    return bus ? bus.license_plate : '';
  };

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

  //----------------------------------------------------Xóa route //----------------------------------------------------
  const deleteRouter = async () => {
    try {
      await deleteSeatByDates(route._id, new Date(dayjs().startOf('day')));

      await deleteManyTripByRouteId(
        route._id,
        new Date(dayjs().startOf('day')),
      );
      const response = await dispatch(deleteRouteData(route._id));

      ToastAndroid.show('Xóa thành công !', ToastAndroid.SHORT);
    } catch (e) {
      console.log('Lỗi xóa route:', e);
      ToastAndroid.show('Không thể xóa, thử lại sau !', ToastAndroid.SHORT);
    }
  };

  return (
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
  );
};

export default RouteDetails;

const styles = StyleSheet.create({
  //---------------------styles cho buton chuyển màn hình--------------------------------

  btnContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  btnPage: {
    width: '100%',
    height: 50,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lineBtnPage: {
    width: '100%',
    height: 5,
    backgroundColor: myColor.headerColor,
  },

  textBtnPage: {
    fontSize: 20,
    color: myColor.headerColor,
    fontWeight: '700',
  },

  //---------------------styles cho chi tiết route--------------------------------
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
