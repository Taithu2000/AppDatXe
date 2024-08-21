import React, {Component} from 'react';
import {Image, Text, StyleSheet, Easing} from 'react-native';

import HomeCustomer from '../screen/customerScreen/homeCustomer';
import TripList_Cus from '../screen/customerScreen/tripList_Cus';
import SelectPickUpAndDropOff from '../screen/customerScreen/slectPickUp_Dropoff';
import PaymentScreen from '../screen/customerScreen/payMent';
import OrderInformation from '../screen/customerScreen/orderInformation';
import {customStyles} from '../constants/customStyles';
import {myColor} from '../constants/myColor';

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SelectSeats from '../screen/customerScreen/selectSeats';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomerNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeNav"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: customStyles.bottomTab,
      }}>
      <Tab.Screen
        name="HomeNav"
        component={HomeNav}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.tabBarLabel,
                {color: focused ? myColor.buttonColor : 'black'},
              ]}>
              Trang chủ
            </Text>
          ),

          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/house-chimney.png')}
              style={[styles.iconTab, focused && styles.focusIcon]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerNav;

export const HomeNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeCustomer"
      screenOptions={{
        headerShown: false,

        cardStyleInterpolator: ({current, layouts}) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}>
      <Stack.Screen name="HomeCustomer" component={HomeCustomer} />
      <Stack.Screen name="TripList_Cus" component={TripList_Cus} />
      <Stack.Screen name="SelectSeats" component={SelectSeats} />
      <Stack.Screen
        name="SelectPickUpAndDropOff"
        component={SelectPickUpAndDropOff}
      />
      <Stack.Screen name="OrderInformation" component={OrderInformation} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    color: '#000',
  },
  iconTab: {
    height: 25,
    width: 25,
    tintColor: '#000',
  },
  focusIcon: {
    tintColor: myColor.buttonColor,
  },
});
