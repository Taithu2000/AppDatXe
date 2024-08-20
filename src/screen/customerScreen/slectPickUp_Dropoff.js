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
import {fontFamilies} from '../../constants/fontFamilies';
import {IconSteps} from '../../components/iconSteps';
import {getTripByRouteIdAndDate} from '../../api/tripsAPI';
import {calculateEndTime} from '../../constants/formatHH-mm';
import {MyButton} from '../../components/button/myButton';

const SelectPickUpAndDropOff = ({navigation, route}) => {
  const {trip, seat, selectSeat} = route.params;
  //   const [selectSeat, setSelectSeat] = useState([]);
  const [listTrip, setListTrip] = useState([]);
  const [selectProvince, setSelectProvince] = useState(false);
  const [selectPickup, setSelectPickup] = useState({
    pickup: trip.pickup,
    pickupTime: trip.pickupTime,
  });
  const [selectDropOff, setSelectDropOff] = useState(trip.drop_off);

  //   --------------------------------------------Tắt bottomtab------------------------------------------------
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
  }, [trip]);
  //   --------------------------------------------lấy danh sách trips để hiển thị điểm đón- trả------------------------------------------------

  useEffect(() => {
    const getTrips = async () => {
      const data = await getTripByRouteIdAndDate(trip.route_id, trip.trip_date);
      const newData = data.filter(item => {
        return (
          item.start_point === trip.start_point &&
          item.end_point === trip.end_point
        );
      });
      setListTrip(newData);
    };
    getTrips();
  }, []);

  //   --------------------------------------------item chọn điểm đón trả------------------------------------------------
  const Item = ({item, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          height: 60,
          marginBottom: 5,
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{width: '10%'}}>
            <Image
              style={{width: 25, height: 25, tintColor: myColor.buttonColor}}
              source={
                !selectProvince
                  ? require('../../assets/images/location-crosshairs.png')
                  : require('../../assets/images/marker.png')
              }
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            {!selectProvince && (
              <>
                <Text style={[styles.text, {width: '75%'}]}>{item.pickup}</Text>
                <Text style={styles.text}>{item.pickupTime}</Text>
              </>
            )}

            {selectProvince && (
              <>
                <Text style={styles.text}> {item.drop_off}</Text>
                <Text style={styles.text}>
                  {calculateEndTime(item.pickupTime, item.totalTime)}
                </Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={'rgba(0, 0, 0, 0)'}
        barStyle="light-content"
        translucent={true}
      />

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
          Chọn điểm đón và trả
        </Text>
      </View>

      <View style={{flex: 1}}>
        <IconSteps iconLocation={true} />

        <View style={{width: '90%', alignSelf: 'center'}}>
          {/*-------------------- chọn điểm đón {/*--------------------*/}
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.btnProvince,
              {backgroundColor: !selectProvince ? '#cbd5d6' : '#FFFFFF'},
            ]}
            onPress={() => {
              setSelectProvince(false);
            }}>
            <Text style={{fontSize: 18, color: myColor.buttonColor}}>
              Điểm đón
            </Text>
            <Text style={styles.text}>{selectPickup.pickup}</Text>
          </TouchableOpacity>
          {/*-------------------- chọn điểm trả {/*--------------------*/}
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.btnProvince,
              {backgroundColor: selectProvince ? '#cbd5d6' : '#FFFFFF'},
            ]}
            onPress={() => {
              setSelectProvince(true);
            }}>
            <Text style={{fontSize: 18, color: myColor.buttonColor}}>
              Điểm trả
            </Text>
            <Text style={styles.text}>{selectDropOff}</Text>
          </TouchableOpacity>

          {/*-------------------- danh sách điểm đón trả {/*--------------------*/}
          <Text style={styles.text}>
            {!selectProvince ? 'Danh sách điểm đón' : 'Danh sách điểm trả'}
          </Text>

          <FlatList
            data={listTrip}
            renderItem={({item}) => (
              <Item
                item={item}
                onPress={() => {
                  if (!selectProvince) {
                    setSelectPickup({
                      pickup: item.pickup,
                      pickupTime: item.pickupTime,
                    });
                    setSelectProvince(true);
                  } else {
                    setSelectDropOff(item.drop_off);
                  }
                }}
              />
            )}
            keyExtractor={item => item._id}
            ListFooterComponent={<View style={{height: 80}} />}
            ItemSeparatorComponent={() => (
              <View
                style={{width: '100%', height: 1, backgroundColor: '#CCC'}}
              />
            )}
          />
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 20,
          }}>
          <MyButton
            nameBtn={'Tiếp tục'}
            onPress={() => {
              navigation.navigate('OrderInformation', {
                trip,
                seat,
                selectSeat,
                selectPickup,
                selectDropOff,
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnProvince: {
    borderWidth: 1,
    borderColor: myColor.buttonColor,
    width: '100%',
    height: 100,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#000000',
  },
});

export default SelectPickUpAndDropOff;
