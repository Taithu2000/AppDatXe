//import liraries
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
} from 'react-native';
import {myColor} from '../../constants/myColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {IconSteps} from '../../components/iconSteps';
import {MyButton} from '../../components/button/myButton';
import paypalApi from '../../api/payPalApi';
import WebView from 'react-native-webview';
import queryString from 'query-string';

let orderDetail = {
  intent: 'CAPTURE',
  purchase_units: [
    {
      items: [
        {
          name: 'T-Shirt',
          description: 'Green XL',
          quantity: '1',
          unit_amount: {
            currency_code: 'USD',
            value: '200.00',
          },
        },
      ],
      amount: {
        currency_code: 'USD',
        value: '200.00',
        breakdown: {
          item_total: {
            currency_code: 'USD',
            value: '200.00',
          },
        },
      },
    },
  ],
  application_context: {
    return_url: 'https://example.com/return',
    cancel_url: 'https://example.com/cancel',
  },
};
// create a component
const PaymentScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  //   --------------------------------------------Tắt bottomtab------------------------------------------------

  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
  }, []);

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
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const onUrlChange = webviewState => {
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      const {token} = urlValues.query;
      if (!!token) {
        paymentSucess(token);
      }
    }
  };

  const paymentSucess = async id => {
    try {
      const res = await paypalApi.capturePayment(id, accessToken);
      alert('Payment sucessfull...!!!');

      clearPaypalState();
    } catch (error) {
      console.log('error raised in payment capture', error);
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
          Thanh toán
        </Text>
      </View>

      <IconSteps iconLocation={true} iconUser={true} iconCard={true} />
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.viewInfo}>
            <Text style={styles.hederInfo}>Thông tin chuyến</Text>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Tuyến</Text>
              <Text style={styles.textRight}>HCM-Dak Lak</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Khởi hành</Text>
              <Text style={styles.textRight}>10:00 20/08/2024</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Số lượng vé</Text>
              <Text style={styles.textRight}>2</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Vị trí</Text>
              <Text style={styles.textRight}>A2, B3</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Giá vé</Text>
              <Text style={styles.textRight}>280.000đ</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.text}>Tổng tiền</Text>
              <Text
                style={[styles.textRight, {fontSize: 20, fontWeight: '700'}]}>
                560.000đ
              </Text>
            </View>
            <Text style={styles.hederInfo}>Điểm đón</Text>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>VP Bình Tân</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Đón lúc</Text>
              <Text style={styles.textRight}>10:30 20/08/2024</Text>
            </View>
            <Text style={styles.hederInfo}>Điểm trả</Text>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>VP Buôn Ma thuột</Text>
            </View>
            <Text style={styles.hederInfo}>Thông tin hành khách</Text>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Tên</Text>
              <Text style={styles.textRight}>Võ Tài Thu</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Số điện thoại</Text>
              <Text style={styles.textRight}>0356678181</Text>
            </View>
            <View style={styles.viewInline}>
              <Text style={styles.textRight}>Ghi chú</Text>
              <View
                style={{
                  width: '60%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text style={styles.textRight}>ghi chú ghi chú ghi chú </Text>
              </View>
            </View>
          </View>
          <View style={{height: 80}}></View>
        </ScrollView>
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 10,
        }}>
        <MyButton onPress={onPressPaypal} nameBtn={'Thanh toán PayPal'} />

        <Modal visible={!!paypalUrl}>
          <TouchableOpacity onPress={clearPaypalState} style={{margin: 24}}>
            <Text>Closed</Text>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <WebView
              source={{uri: paypalUrl}}
              onNavigationStateChange={onUrlChange}
            />
          </View>
        </Modal>
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
});

export default PaymentScreen;
