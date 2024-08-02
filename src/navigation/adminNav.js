import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeAdmin from '../screen/adminScreen/homeAdmin';
import CustomerList from '../screen/adminScreen/customerList';
import CustomerDetails from '../screen/adminScreen/customerDetails';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const LoginNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="CustomerNav"
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
      <Tab.Screen name="HomeAdmin" component={HomeAdmin} />
      <Tab.Screen name="CustomerNav" component={CustomerNav} />
    </Tab.Navigator>
  );
};
export default LoginNav;

export const CustomerNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="CustomerList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CustomerList" component={CustomerList} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
    </Stack.Navigator>
  );
};
