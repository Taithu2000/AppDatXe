import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {getAllbusAPI} from '../../api/busesAPI';
import {formatDate, formatDateFromISOString} from '../../constants/formatDate';
import AddBus from './busAdd';
import {selectBus, getAllbusData} from '../../redux/actions/busAction';
import {useDispatch, useSelector} from 'react-redux';

//------------------------------------Danh sách Xe----------------------------------------------

const BusList = ({navigation}) => {
  // const [buses, setBuses] = useState([]);
  const [validModal, setValidModal] = useState(false);
  const {buses} = useSelector(state => state.bus);
  const dispatch = useDispatch();

  const getBuses = async () => {
    await dispatch(getAllbusData());
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (validModal === false) {
  //       getBuses();
  //       console.log('goi api');
  //     }
  //   }, [validModal]),
  // );

  useEffect(() => {
    getBuses();
  }, []);

  const Item = ({item, onPress}) => (
    <TouchableOpacity style={style.containerItem} onPress={onPress}>
      <Image
        source={require('../../assets/images/Bus.png')}
        style={style.itemImage}
      />
      <Text style={style.textLicensePlate}>{item.license_plate}</Text>

      <View style={style.itemBody}>
        <Text style={style.textItem}>Loại:</Text>
        <Text style={style.textItem}>{item.type}</Text>
      </View>
      <View style={style.itemBody}>
        <Text style={style.textItem}>Số chỗ:</Text>
        <Text style={style.textItem}>{item.num_Seats}</Text>
      </View>
      <View style={style.itemBody}>
        <Text style={style.textItem}>Đăng kiểm:</Text>
        <Text style={style.textItem}>
          {formatDateFromISOString(item.registration_date)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {/*------------------------------- Mỏ modal thêm xe/*------------------------------- */}

        <AddBus validModal={validModal} setValidModal={setValidModal} />
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

            {/* ------------------------------Button mở màn hình modal thêm xe --------------------------*/}

            <TouchableOpacity
              style={style.btnAddBus}
              onPress={() => {
                setValidModal(true);
              }}>
              <Image
                source={require('../../assets/images/bus-icon.png')}
                F
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
          <FlatList
            style={{marginTop: 10}}
            data={buses}
            renderItem={({item}) => (
              <Item
                item={item}
                onPress={() => {
                  dispatch(selectBus(item));
                  navigation.navigate('BusDetails');
                }}
              />
            )}
            keyExtractor={item => item._id}
            numColumns={2}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

{
  /*-------------------------------------- Style--------------------------------- */
}

const style = StyleSheet.create({
  viewheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
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
    alignItems: 'center',
    borderColor: '#C0C0C0',
    backgroundColor: '#FFFFEE',
  },
  itemImage: {
    width: '80%',
    height: 100,
    resizeMode: 'stretch',
  },

  textLicensePlate: {
    color: '#000000',
    fontSize: 20,
    fontFamily: fontFamilies.Bold,
  },
  itemBody: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    margin: 5,
  },
  textItem: {
    color: '#000000',
    fontSize: 16,
  },
});

export default BusList;
