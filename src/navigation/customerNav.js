import React, {Component} from 'react';
import {Image, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeCustomer from '../screen/customerScreen/homeCustomer';
import TripList_Cus from '../screen/customerScreen/tripList_Cus';

import {customStyles} from '../constants/customStyles';
import {myColor} from '../constants/myColor';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {exp} from 'react-native-reanimated';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomerNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="RouteNav"
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
      }}>
      <Stack.Screen name="HomeCustomer" component={HomeCustomer} />
      <Stack.Screen name="TripList_Cus" component={TripList_Cus} />
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
