import React, {useState, useEffect} from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const RotateLoading = () => {
  const [spinAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <Image
          source={require('../../assets/images/rotate-right.png')}
          style={styles.image}
        />
      </Animated.View>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },

  image: {
    width: 30,
    height: 30,
  },
});

export default RotateLoading;
