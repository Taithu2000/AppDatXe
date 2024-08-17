import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {myColor} from '../../constants/myColor';
import {MyStatusBar} from '../../components/myStatusBar';
import {useSelector, useDispatch} from 'react-redux';
import FindTrip from '../../components/findTrip';
import {
  selectStartPoint,
  selectEndPoint,
  selectDateAction,
} from '../../redux/actions/locationAction';
import dayjs from 'dayjs';
const HomeCustomer = ({navigation}) => {
  // const user = useSelector(state => state.user);
  const user = {name: 'Thu'};

  const {startLocation, endLocation, departure_date} = useSelector(
    state => state.location,
  );

  console.log(endLocation);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <View style={styles.containerImg}>
        <Image
          source={require('../../assets/images/anh-voi.jpg')}
          style={styles.imgWelcome}
        />
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={styles.viewWelcome}>
          <Text style={styles.textTitle}>Xin chào {user.name}</Text>
          <Text style={{color: '#000', fontSize: 18}}>
            Hãy bắt đầu chuyến hành trình ngay nào!
          </Text>
        </View>
        <View style={{width: '100%', marginTop: 35}}>
          <FindTrip
            startLocation={startLocation}
            setStartLocation={item => dispatch(selectStartPoint(item))}
            endLocation={endLocation}
            setEndLocation={item => dispatch(selectEndPoint(item))}
            date={departure_date}
            setDate={date => dispatch(selectDateAction(date))}
            onPress={() => {
              navigation.navigate('TripList_Cus');
            }}
          />
        </View>
        <View style={{height: 75}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerImg: {
    width: '100%',
    height: 250,
    position: 'absolute',
    zIndex: -1,
  },

  imgWelcome: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },

  viewWelcome: {
    width: '90%',
    marginTop: 75,
    height: 75,
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
});

export default HomeCustomer;
