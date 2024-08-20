import React, {Component, useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {MyButton} from '../../components/button/myButton';
import {ButtonDel} from '../../components/button/buttonDel';
import {DeletetDialog} from '../../components/dialog/dialogDelete';
import {useSelector, useDispatch} from 'react-redux';
import {formatDateFromISOString} from '../../constants/formatDate';
import BusUpdate from './busUpdate';
import {deleteBus} from '../../redux/actions/busAction';
import ItemRoute from '../../components/itemFlatList/itemRoute';
import {selectRoute} from '../../redux/actions/routeAction';
import dayjs from 'dayjs';

// import {IP} from '@env';

const IP = 'http://10.0.2.2:3306';

const CustomerDetails = ({navigation}) => {
  const {bus} = useSelector(state => state.bus);
  const {routes} = useSelector(state => state.route);

  const dispatch = useDispatch();

  const [isvalidData, setIsvalidData] = useState(false);

  const [isVisibleDel, setIsVisibleDel] = useState(false);

  const [validModal, setValidModal] = useState(false);

  const deleteBusData = async () => {
    const response = await dispatch(deleteBus(bus._id));
    if (response) {
      ToastAndroid.show('Xóa thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Không thể xóa, thử lại sau !', ToastAndroid.SHORT);
    }
  };

  // ---------------------------------------------ẩn bottom tab---------------------------------------------

  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
  }, []);

  //----------------//---------------- kiểm tra có tuyến đường hay không---//--------------------------------

  useEffect(() => {
    const checkData = routes.some(route => {
      const end_date = new Date(
        dayjs(route.end_date).format('YYYY-MM-DD'),
      ).getTime();
      const date_now = new Date(
        dayjs(new Date()).format('YYYY-MM-DD'),
      ).getTime();

      return route.bus_id == bus._id && end_date >= date_now;
    });
    setIsvalidData(checkData);
  }, [routes]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
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
          Thông tin xe
        </Text>
      </View>

      {/* -------------------------------------------BODY----------------------------- */}

      <BusUpdate validModal={validModal} setValidModal={setValidModal} />

      <ScrollView>
        <View style={styles.busContainer}>
          <View style={styles.rowView}>
            <View style={{width: '60%'}}>
              <Text style={styles.textPlate}>{bus.license_plate}</Text>
            </View>
            <Image
              source={require('../../assets/images/Bus.png')}
              style={styles.imageBus}
            />
          </View>

          <View style={styles.rowView}>
            <Text style={[styles.text, {color: '#555555'}]}>
              Ngày đăng kiểm
            </Text>

            <Text style={styles.text}>
              {formatDateFromISOString(bus.registration_date)}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.text, {color: '#555555'}]}>Loại xe</Text>

            <Text style={styles.text}>{bus.type}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.text, {color: '#555555'}]}>Hãng xe</Text>

            <Text style={styles.text}>{bus.brand}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.text, {color: '#555555'}]}>Màu xe</Text>

            <Text style={styles.text}>{bus.color}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.text, {color: '#555555'}]}>Số ghế</Text>

            <Text style={styles.text}>{bus.num_Seats}</Text>
          </View>

          {/* ------------------------------------Button Xoa-------------------------------------------------------------- */}

          <View style={[styles.rowView, {marginTop: 40}]}>
            <View style={{width: '60%'}}>
              <MyButton
                nameBtn={'Chỉnh sửa'}
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
                title={'Xóa thông tin xe'}
                description={'Bạn có chắc muốn xóa thông tin xe này?'}
                visible={isVisibleDel}
                onCancel={() => {
                  setIsVisibleDel(false);
                }}
                onDelete={async () => {
                  deleteBusData();
                  setIsVisibleDel(false);
                  navigation.goBack();
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.boundary}>
          <Text
            style={{
              fontFamily: fontFamilies.Bold,
              fontSize: 20,
              color: '#000',
            }}>
            Tuyến đường hoạt động
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddRoute', {bus});
            }}>
            <Text style={{fontSize: 20, color: myColor.headerColor}}>
              Thêm tuyến
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 20}}>
          {routes.map((route, index) => {
            const end_date = new Date(
              dayjs(route.end_date).format('YYYY-MM-DD'),
            ).getTime();
            const date_now = new Date(
              dayjs(new Date()).format('YYYY-MM-DD'),
            ).getTime();

            if (route.bus_id == bus._id && end_date >= date_now) {
              return (
                <ItemRoute
                  key={index}
                  item={route}
                  onPress={() => {
                    dispatch(selectRoute(route));
                    navigation.navigate('RouteDetails');
                  }}
                />
              );
            }
          })}

          {console.log(isvalidData)}
          {isvalidData ? (
            <Text></Text>
          ) : (
            <View style={{height: 120}}>
              <Image
                source={require('../../assets/images/train-journey.png')}
                style={styles.imageData}
              />

              <Text style={{fontSize: 16, alignSelf: 'center'}}>
                Chưa có tuyến đường nào !
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerDetails;

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
    marginTop: 15,
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

  boundary: {
    marginTop: 50,
    marginBottom: 40,
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imageData: {
    width: 60,
    height: 60,
    margin: 10,
    alignSelf: 'center',
    tintColor: '#2fd6c3',
  },
});
