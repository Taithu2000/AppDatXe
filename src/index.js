import React, {Component} from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginNav from './navigation/loginNav';

const RootStack = createNativeStackNavigator();

const RootComponent = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="LoginNav"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="LoginNav" component={LoginNav} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootComponent;
