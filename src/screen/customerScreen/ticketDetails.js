import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import HeaderScreen from '../../components/header/headerScreen';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
// create a component
const TicketDetails = ({navigation, route: myRoute}) => {
  const {role} = useSelector(state => state.role);
  const {ticket, route, user} = myRoute.params;

  //   --------------------------------------------Tắt bottomtab------------------------------------------------

  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={'rgba(0, 0, 0, 0)'}
        barStyle="light-content"
        translucent={true}
      />
      <HeaderScreen navigation={navigation} header={'Chi tiết vé'} />

      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.viewInfo}>
            <Text style={styles.hederInfo}>Thông tin chuyến</Text>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Tuyến</Text>
              <Text
                style={
                  styles.textRight
                }>{`${route.start_point} - ${route.end_point}`}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Khởi hành</Text>
              <Text style={styles.textRight}>{`${
                route.departure_time
              }   ${dayjs(ticket.departure_time).format('DD/MM/YYYY')}`}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Số lượng vé</Text>
              <Text style={styles.textRight}>{ticket.seats.length}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Vị trí</Text>
              <Text style={styles.textRight}>
                {ticket.seats
                  .map(seat => {
                    return seat.name;
                  })
                  .join(', ')}
              </Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Giá vé</Text>
              <Text style={styles.textRight}>
                {' '}
                {`${ticket.ticket_price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`}
              </Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Tổng tiền</Text>
              <Text
                style={[styles.textRight, {fontSize: 20, fontWeight: '700'}]}>
                {`${(ticket.ticket_price * ticket.seats.length)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`}
              </Text>
            </View>
            <Text style={styles.hederInfo}>Điểm đón</Text>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>{ticket.pickup}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Đón lúc</Text>
              <Text style={styles.textRight}>{`${ticket.pickupTime}   ${dayjs(
                ticket.departure_time,
              ).format('DD/MM/YYYY')}`}</Text>
            </View>
            <Text style={styles.hederInfo}>Điểm trả</Text>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>{ticket.drop_off}</Text>
            </View>
            <Text style={styles.hederInfo}>Thông tin hành khách</Text>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Tên</Text>
              <Text style={styles.textRight}>{ticket.customer.name}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Số điện thoại</Text>
              <Text style={styles.textRight}>{ticket.customer.phone}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Ghi chú</Text>
              <View
                style={{
                  width: '60%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text style={styles.textRight}>{ticket.customer.note}</Text>
              </View>
            </View>
            {role === 'admin' && (
              <>
                <View
                  style={{
                    width: '100%',
                    marginTop: 20,
                    borderTopWidth: 1,
                    borderStyle: 'dashed',
                  }}></View>
                <Text style={styles.hederInfo}>Tài khoản mua vé</Text>
                <View style={styles.viewInline}>
                  <Text style={styles.textRight}>Tên</Text>
                  <Text style={styles.textRight}>{user?.name}</Text>
                </View>
                <View style={styles.viewInline}>
                  <Text style={styles.textRight}>Số điện thoại</Text>
                  <Text style={styles.textRight}>{user?.phoneNumber}</Text>
                </View>
                <View style={styles.viewInline}>
                  <Text style={styles.textRight}>Email</Text>
                  <Text style={styles.textRight}>{user?.email}</Text>
                </View>
              </>
            )}
          </View>

          <View style={{height: 80}}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  viewInfo: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },

  hederInfo: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '700',
    marginTop: 15,
  },

  viewInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  text: {
    fontSize: 18,
    color: '#000000',
  },
  textRight: {
    fontSize: 18,
    color: '#000000',
  },

  textHeader: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default TicketDetails;
