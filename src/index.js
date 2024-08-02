import React, {Component} from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginNav from './navigation/loginNav';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import HomeUser from './screen/userScreen/homeUser';
import AdminNav from './navigation/adminNav';

const RootStack = createNativeStackNavigator();

const RootComponent = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="LoginNav"
          screenOptions={{headerShown: false}}>
          <RootStack.Screen name="LoginNav" component={LoginNav} />
          <RootStack.Screen name="HomeUser" component={HomeUser} />
          <RootStack.Screen name="AdminNav" component={AdminNav} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default RootComponent;
