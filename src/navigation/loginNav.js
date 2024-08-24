import React, {Component} from 'react';
import {SafeAreaView, View, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screen/loginScreen/splash';
import PhoneNumber from '../screen/loginScreen/phoneNumber';
import PasswordInput from '../screen/loginScreen/passwordInput';
import NameInput from '../screen/loginScreen/nameInput';
import NewPassword from '../screen/loginScreen/newPassword';

const Stack = createNativeStackNavigator();
const LoginNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="PasswordInput" component={PasswordInput} />
      <Stack.Screen name="NameInput" component={NameInput} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};
export default LoginNav;
