import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  ScrollView,
} from 'react-native';
import {myColor} from '../../constants/myColor';
import {IconSteps} from '../../components/iconSteps';
import {MyButton} from '../../components/button/myButton';
import paypalApi from '../../api/payPalApi';
import WebView from 'react-native-webview';
import queryString from 'query-string';
import {useSelector, useDispatch} from 'react-redux';
import {selectRouteById} from '../../redux/actions/routeAction';
import {addTicketApi} from '../../api/ticketApi';
import {updateSeatNumbers} from '../../api/seat';
import DialogNotify from '../../components/dialog/dialogNotify';
import HeaderScreen from '../../components/header/headerScreen';
import RotateLoading from '../../components/loading/rotateLoading';
import dayjs from 'dayjs';

// create a component
const PaymentScreen = ({navigation, route: myRoute}) => {
  const {
    trip,
    seat,
    selectSeat,
    selectPickup,
    selectDropOff,
    name,
    phone,
    note,
  } = myRoute.params;

  const {route} = useSelector(state => state.route);
  const {user} = useSelector(state => state.user);

  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [visibleNotify, setVisibleNotify] = useState(false);
  const [isLoadingWebView, setLoadingWebView] = useState(false);

  //   -------------------------------------------Tạo vé cho Paypal----------------------------------------------

  const orderDetail = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: ((trip.ticket_price * selectSeat.length) / 26000).toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: ((trip.ticket_price * selectSeat.length) / 26000).toFixed(
                2,
              ),
            },
          },
        },
        items: selectSeat.map(seat => ({
          name: `Ghế ${seat.name}`,
          description: `Tuyến ${route.start_point} - ${route.end_point} `,
          unit_amount: {
            currency_code: 'USD',
            value: (trip.ticket_price / 26000).toFixed(2),
          },
          quantity: '1',
        })),
      },
    ],
    application_context: {
      return_url: 'https://example.com/return',
      cancel_url: 'https://example.com/cancel',
    },
  };

  //   -------------------------------------------THêm vé vào database----------------------------------------------

  const addTicket = async () => {
    const data = {
      user_id: user._id,
      route_id: route._id,
      departure_time: trip.trip_date,
      seats: selectSeat,
      ticket_price: trip.ticket_price,
      pickup: selectPickup.pickup,
      drop_off: selectDropOff,
      pickupTime: selectPickup.pickupTime,
      customer: {
        name: name,
        phone: phone,
        note: note,
      },
    };

    await addTicketApi(data);
  };
  //   -------------------------------------------Cập nhật ghế------------------------------------------------

  const numbers = selectSeat.map(seat => {
    return seat.key;
  });

  const updateSeats = async () => {
    await updateSeatNumbers(seat._id, {
      seatNumbers: numbers,
    });
  };

  //   --------------------------------------------Tắt bottomtab------------------------------------------------

  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
  }, []);

  //   --------------------------------------------Lấy thông tin tuyến đường------------------------------------------------
  useEffect(() => {
    const getRoute = async () => {
      await dispatch(selectRouteById(trip.route_id));
    };
    getRoute();
  }, []);

  //   --------------------------------------------Các hàm cho PayPal------------------------------------------------

  const onPressPaypal = async () => {
    setLoading(true);
    try {
      const token = await paypalApi.generateToken();
      const res = await paypalApi.createOrder(orderDetail, token);
      setAccessToken(token);
      setLoading(false);
      if (!!res?.links) {
        const findUrl = res.links.find(data => data?.rel == 'approve');
        setPaypalUrl(findUrl.href);
        setLoadingWebView(!!findUrl.href);
      }
    } catch (error) {
      console.log('Lỗi:  ', error);
      setLoading(false);
    }
  };

  let flag = false;
  const onUrlChange = webviewState => {
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      const {token} = urlValues.query;
      if (!!token) {
        if (!flag) {
          paymentSucess(token);
          flag = true;
        }
        {
          clearPaypalState();
        }
      }
    }
  };

  const paymentSucess = async id => {
    try {
      const res = await paypalApi.capturePayment(id, accessToken);
      clearPaypalState();
      setVisibleNotify(true);
      addTicket();
      updateSeats();
    } catch (error) {
      console.log('lỗi trong quá trình thanh toán', error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={'rgba(0, 0, 0, 0)'}
        barStyle="light-content"
        translucent={true}
      />
      <HeaderScreen navigation={navigation} header={'Thanh toán'} />

      <View style={{flex: 1}}>
        {isLoading && <RotateLoading />}

        <IconSteps iconLocation={true} iconUser={true} iconCard={true} />

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
              }   ${dayjs(trip.trip_date).format('DD/MM/YYYY')}`}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Số lượng vé</Text>
              <Text style={styles.textRight}>{selectSeat.length}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Vị trí</Text>
              <Text style={styles.textRight}>
                {selectSeat
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
                {`${trip.ticket_price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`}
              </Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Tổng tiền</Text>
              <Text
                style={[styles.textRight, {fontSize: 20, fontWeight: '700'}]}>
                {`${(trip.ticket_price * selectSeat.length)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`}
              </Text>
            </View>
            <Text style={styles.hederInfo}>Điểm đón</Text>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>{selectPickup.pickup}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Đón lúc</Text>
              <Text style={styles.textRight}>{`${
                selectPickup.pickupTime
              }   ${dayjs(trip.trip_date).format('DD/MM/YYYY')}`}</Text>
            </View>
            <Text style={styles.hederInfo}>Điểm trả</Text>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>{selectDropOff}</Text>
            </View>
            <Text style={styles.hederInfo}>Thông tin hành khách</Text>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Tên</Text>
              <Text style={styles.textRight}>{name}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Số điện thoại</Text>
              <Text style={styles.textRight}>{phone}</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Ghi chú</Text>
              <View
                style={{
                  width: '60%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text style={styles.textRight}>{note}</Text>
              </View>
            </View>
          </View>
          <View style={{height: 80}}></View>
        </ScrollView>

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 20,
          }}>
          <MyButton
            onPress={() => {
              onPressPaypal();
            }}
            nameBtn={'Thanh toán PayPal'}
          />
        </View>

        {/* --------------------------------Modal------------------------------- */}
        <Modal visible={!!paypalUrl}>
          <View style={styles.headerPayPal}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                left: 10,
              }}
              onPress={clearPaypalState}>
              <Image
                source={require('../../assets/images/arrow-small-left.png')}
                style={{width: 40, height: 40, tintColor: '#FFFFFF'}}
              />
            </TouchableOpacity>

            <Text style={styles.textHeader}>Thanh toán PayPal</Text>
          </View>
          <View style={{flex: 1}}>
            {isLoadingWebView && <RotateLoading />}
            <WebView
              source={{uri: paypalUrl}}
              onNavigationStateChange={onUrlChange}
              onLoad={() => {
                setLoadingWebView(false);
              }}
            />
          </View>
        </Modal>

        <DialogNotify
          visible={visibleNotify}
          source={require('../../assets/images/check.png')}
          title={'Mua vé thành công'}
          onPress={() => {
            setVisibleNotify(false);
            navigation.popToTop();
          }}
        />
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

  headerPayPal: {
    backgroundColor: myColor.headerColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  textHeader: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default PaymentScreen;
