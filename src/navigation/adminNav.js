import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeAdmin from '../screen/adminScreen/homeAdmin';
import CustomerList from '../screen/adminScreen/customerList';
import CustomerDetails from '../screen/adminScreen/customerDetails';
import BusList from '../screen/adminScreen/busList';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const LoginNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="BusList"
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
      <Tab.Screen name="HomeAdmin" component={HomeAdmin} />
      <Tab.Screen name="BusList" component={BusList} />
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

// export const BusNav = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="BusDetails"
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen name="BusList" component={BusList} />
//       <Stack.Screen name="BusDetails" component={BusDetails} />
//     </Stack.Navigator>
//   );
// };
