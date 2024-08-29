import React, {Component, useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {customStyles} from '../../constants/customStyles';
import DialogNotifyOK_Cancel from '../../components/dialog/dialogNotifyOK_Cancel';
import {logoutUser} from '../../redux/actions/userAction';

const SettingScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [visibleLogout, setVisibleLogout] = useState(false);
  //---------------------------------------------hiển thị bottom tab---------------------------------------------
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({tabBarStyle: customStyles.bottomTab});
    }, [navigation]),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {/* Phần tiêu đề header */}
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
            height: 150,
            backgroundColor: myColor.headerColor,
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              alignSelf: 'center',
              marginTop: 20,
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            Cài đặt
          </Text>
        </View>

        <View style={styles.containerBody}>
          {/* -------------------------tài khoản------------------------- */}

          {/* -------------------------đăng xuất------------------------- */}
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              setVisibleLogout(true);
            }}>
            <Image
              style={styles.iconImg}
              source={require('../../assets/images/sign-out-alt.png')}
            />
            <Text style={styles.text}>Đăng xuất</Text>
            <Image
              style={styles.iconArrow}
              source={require('../../assets/images/angle-small-right.png')}
            />
            {/* modal thông báo đăng xuất */}
            <DialogNotifyOK_Cancel
              visible={visibleLogout}
              source={require('../../assets/images/red-card.png')}
              title={'Đăng xuất'}
              content={'Bạn có thực sự muốn thoát khỏi ứng dụng?'}
              onPressCancel={() => {
                setVisibleLogout(false);
              }}
              onPress={() => {
                dispatch(logoutUser());
                navigation.reset({
                  index: 0,
                  routes: [{name: 'LoginNav'}],
                });

                setVisibleLogout(false);
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerBody: {
    flex: 1,
    marginTop: -30,
    borderRadius: 30,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  accountView: {
    width: '95%',
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    elevation: 5,
    borderRadius: 10,
  },

  img: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: 20,
    elevation: 10,
  },
  text: {
    color: '#000000',
    fontSize: 18,
  },
  iconArrow: {
    width: 30,
    height: 30,

    position: 'absolute',
    right: 10,
  },
  itemContainer: {
    width: '95%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    elevation: 5,
    borderRadius: 10,
  },
  iconImg: {
    width: 30,
    height: 30,
    tintColor: myColor.buttonColor,
    marginRight: 20,
  },
});
export default SettingScreen;
