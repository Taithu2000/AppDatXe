import React, {Component} from 'react';
import {Image, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeAdmin from '../screen/adminScreen/homeAdmin';
import CustomerList from '../screen/adminScreen/customerList';
import CustomerDetails from '../screen/adminScreen/customerDetails';
import BusList from '../screen/adminScreen/busList';
import BusDetails from '../screen/adminScreen/busDetails';
import RouteList from '../screen/adminScreen/routeList';
import AddRoute from '../screen/adminScreen/routeAdd';
import RouteDetails from '../screen/adminScreen/routeDetails';
import TripAdd from '../screen/adminScreen/tripAdd';
import TripDetails from '../screen/adminScreen/tripDetails';
import {customStyles} from '../constants/customStyles';
import {myColor} from '../constants/myColor';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AdminNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeAdmin"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: customStyles.bottomTab,
      }}>
      <Tab.Screen
        name="HomeAdmin"
        component={HomeAdmin}
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
      <Tab.Screen
        name="BusNav"
        component={BusNav}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.tabBarLabel,
                {color: focused ? myColor.buttonColor : 'black'},
              ]}>
              Xe
            </Text>
          ),

          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/bus-alt.png')}
              style={[styles.iconTab, focused && styles.focusIcon]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="RouteNav"
        component={RouteNav}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.tabBarLabel,
                {color: focused ? myColor.buttonColor : 'black'},
              ]}>
              Tuyến đường
            </Text>
          ),

          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/roadmap.png')}
              style={[styles.iconTab, focused && styles.focusIcon]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CustomerNav"
        component={CustomerNav}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.tabBarLabel,
                {color: focused ? myColor.buttonColor : 'black'},
              ]}>
              Khách hàng
            </Text>
          ),

          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/users-alt.png')}
              style={[styles.iconTab, focused && styles.focusIcon]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AdminNav;

export const BusNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="BusList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BusList" component={BusList} />
      <Stack.Screen name="BusDetails" component={BusDetails} />
      <Stack.Screen name="AddRoute" component={AddRoute} />
      <Stack.Screen name="RouteDetails" component={RouteDetails} />
    </Stack.Navigator>
  );
};

export const RouteNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="RouteList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="RouteList" component={RouteList} />
      <Stack.Screen name="AddRoute" component={AddRoute} />
      <Stack.Screen name="RouteDetails" component={RouteDetails} />
      <Stack.Screen name="TripAdd" component={TripAdd} />
      <Stack.Screen name="TripDetails" component={TripDetails} />
    </Stack.Navigator>
  );
};

export const CustomerNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="CustomerList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CustomerList" component={CustomerList} />
      <Stack.Screen
        name="CustomerDetails"
        component={CustomerDetails}
        options={{
          tabBarStyle: {display: 'none'}, // Ẩn Bottom Tab
        }}
      />
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
