import React, {Component, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import HeaderScreen from '../../components/header/headerScreen';
import WebView from 'react-native-webview';
import RotateLoading from '../../components/loading/rotateLoading';
const NewsScreen = ({navigation, route}) => {
  const {url} = route.params;
  console.log(url);
  const [isLoading, setIsLoading] = useState(true);
  //   --------------------------------------------Tắt bottomtab------------------------------------------------
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: 'none'}});
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={'rgba(0, 0, 0, 0)'}
        barStyle="light-content"
        translucent={true}
      />
      <HeaderScreen navigation={navigation} header={'Tin tức'} />
      <View style={{flex: 1}}>
        {isLoading && <RotateLoading />}

        <WebView
          style={{flex: 1}}
          source={{
            uri: url,
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default NewsScreen;
