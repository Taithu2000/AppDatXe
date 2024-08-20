import React from 'react';
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {myColor} from '../constants/myColor';
export const IconSteps = ({iconLocation,iconUser, iconCard}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={[styles.containerIcon, {backgroundColor: myColor.buttonColor}]}>
        <Image
          source={require('../assets/images/person-seat-reclined.png')}
          style={[styles.iconImg, {tintColor: '#FFFFFF'}]}
        />
      </View>
      <View style={styles.line} />

      <View
        style={[
          styles.containerIcon,
          {backgroundColor: iconLocation ? myColor.buttonColor : '#FFF'},
        ]}>
        <Image
          source={require('../assets/images/marker.png')}
          style={[
            styles.iconImg,
            {tintColor: iconLocation ? '#FFFFFF' : myColor.buttonColor},
          ]}
        />
      </View>
      <View style={styles.line} />

      <View
        style={[
          styles.containerIcon,
          {backgroundColor: iconUser ? myColor.buttonColor : '#FFF'},
        ]}>
        <Image
          source={require('../assets/images/user.png')}
          style={[
            styles.iconImg,
            {tintColor: iconUser ? '#FFFFFF' : myColor.buttonColor},
          ]}
        />
      </View>
      <View style={styles.line} />

      <View
        style={[
          styles.containerIcon,
          {backgroundColor: iconCard ? myColor.buttonColor : '#FFF'},
        ]}>
        <Image
          source={require('../assets/images/credit-card.png')}
          style={[
            styles.iconImg,
            {tintColor: iconCard ? '#FFFFFF' : myColor.buttonColor},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerIcon: {
    borderWidth: 1,
    borderColor: myColor.buttonColor,
    backgroundColor: '#FFF',
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImg: {
    width: 15,
    height: 15,
    tintColor: myColor.buttonColor,
  },
  line: {
    width: 30,
    height: 2,
    margin: 5,
    backgroundColor: myColor.headerColor,
  },
});
