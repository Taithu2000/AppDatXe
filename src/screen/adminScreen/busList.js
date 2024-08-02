import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
const BusList = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {/*------------------------------- Phần tiêu đề header{/*------------------------------- */}
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
            height: 150,
            backgroundColor: myColor.headerColor,
          }}>
          <View style={style.viewheader}>
            <View style={{width: 50, marginRight: 20}}></View>
            <Text style={style.textHeader}>Quản lý xe</Text>

            <TouchableOpacity style={style.btnAddBus}>
              <Image
                source={require('../../assets/images/bus-icon.png')}
                style={style.imgBtnAddBus1}
              />
              <Image
                source={require('../../assets/images/add2.png')}
                style={style.imgBtnAddBus2}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/*-------------------------------------- Danh sách xe--------------------------------- */}

        <View style={style.viewBody}>
          <ScrollView style={style.scrollView}>
            <View style={style.viewInScroll}>
              <View style={style.containerItem}>
                <Image
                  source={require('../../assets/images/Bus.png')}
                  style={style.itemImage}
                />
              </View>
              <View style={style.containerItem}>
                <Image
                  source={require('../../assets/images/Bus.png')}
                  style={style.itemImage}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  viewheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  textHeader: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },

  btnAddBus: {
    width: 50,
    height: 50,

    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    marginRight: 20,
  },

  imgBtnAddBus1: {
    height: 30,
    width: 30,
    paddingLeft: 20,
    position: 'absolute',
    top: 15,
    right: 5,
  },

  imgBtnAddBus2: {
    height: 25,
    width: 25,
    position: 'absolute',
    top: 6,
    left: 4,
  },

  viewBody: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
  },

  scrollView: {
    flex: 1,
    marginTop: 10,
    width: '100%',
  },

  viewInScroll: {flexDirection: 'row', width: '100%', justifyContent: 'center'},

  containerItem: {
    borderWidth: 1,
    borderRadius: 10,
    height: 250,
    width: '45%',
    margin: 10,
  },
  itemImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
});

export default BusList;
