import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeAdmin from '../screen/adminScreen/homeAdmin';
import CustomerList from '../screen/adminScreen/customerList';
import CustomerDetails from '../screen/adminScreen/customerDetails';
import BusList from '../screen/adminScreen/busList';
import BusDetails from '../screen/adminScreen/busDetails';
import RouteList from '../screen/adminScreen/routeList';
import AddRoute from '../screen/adminScreen/routeAdd';
import TestScreen from '../screen/adminScreen/test';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AdminNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="BusNav"
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
      <Tab.Screen name="HomeAdmin" component={HomeAdmin} />
      <Tab.Screen name="BusNav" component={BusNav} />
      <Tab.Screen name="RouteNav" component={RouteNav} />
      <Tab.Screen name="CustomerNav" component={CustomerNav} />
      <Tab.Screen name="TestScreen" component={TestScreen} />
    </Tab.Navigator>
  );
};
export default AdminNav;

export const RouteNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="AddRoute"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="RouteList" component={RouteList} />
      <Stack.Screen name="AddRoute" component={AddRoute} />
    </Stack.Navigator>
  );
};

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

export const BusNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="BusList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BusList" component={BusList} />
      <Stack.Screen name="BusDetails" component={BusDetails} />
    </Stack.Navigator>
  );
};
