import React, {Component, useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {Search} from '../../components/search';
import {fetchUsersDataSSS, getOneUse} from '../../redux/actions/userAction';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {customStyles} from '../../constants/customStyles';

const Customer = ({navigation}) => {
  const users = useSelector(state => state.user.users);

  const dispatch = useDispatch();
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchUsers, setSearchUser] = useState('');
  const [usersCus, setUserCus] = useState([]);

  //---------------------------------------------hiển thị bottom tab---------------------------------------------
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({tabBarStyle: customStyles.bottomTab});
    }, [navigation]),
  );

  //--------------------------------------------lấy data danh sách users---------------------------------------------

  const getDataUser = async () => {
    try {
      await dispatch(fetchUsersDataSSS());
    } catch (error) {
      console.error('lỗi khi lấy dữ liệu user:', error);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  useEffect(() => {
    const newData = users.filter(user => {
      return user.roles === 'user';
    });
    setUserCus(newData);
  }, [users]);

  const handleSearch = () => {
    const filtered = usersCus.filter(user => {
      const nameSearch = user.name
        .toLowerCase()

        .includes(searchUsers.toLowerCase());

      const phoneSearch = user.phoneNumber.includes(searchUsers);

      return nameSearch || phoneSearch;
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchUsers, usersCus]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {/* Phần tiêu đề header */}
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
            height: 150,
            backgroundColor: myColor.headerColor,
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              alignSelf: 'center',
              marginTop: 20,
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            Khách hàng
          </Text>
        </View>

        {/* Danh sách khách hàng */}
        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -60,
            zIndex: 1,
            backgroundColor: myColor.containerColor,
          }}>
          {/* Tìm từ khóa */}
          <Search onChangeText={setSearchUser} value={searchUsers} />

          {/* danh sách */}
          <FlatList
            data={filteredUsers}
            renderItem={({item}) => (
              <Item
                onPress={() => {
                  dispatch(getOneUse(item)),
                    navigation.navigate('CustomerDetails');
                }}
                item={item}
              />
            )}
            keyExtractor={item => item._id}
            ListFooterComponent={<View style={{height: 75}} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Customer;

// ----------------------------------------------------------------ITEM  FLASLIT----------------------------------------------------------------

export const Item = ({item, onPress}) => (
  <View
    style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <TouchableOpacity onPress={onPress} style={{width: '90%', marginTop: 10}}>
      <ScrollView style={{width: '100%'}}>
        <View
          style={{
            borderWidth: 1,
            width: '100%',
            height: 60,
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 30,
            backgroundColor: '#FFFFEE',
            borderColor: '#C0C0C0',
          }}>
          <Image
            source={require('../../assets/images/avatar-user.jpg')}
            style={{width: 50, height: 50, borderRadius: 50, marginLeft: 20}}
          />
          <View style={{marginLeft: 20, width: '60%'}}>
            <Text style={{fontSize: 20, color: '#000'}}>
              {item.phoneNumber}
            </Text>
            <Text style={{fontSize: 16, width: '100%'}}> {item.name}</Text>
          </View>

          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: 10,
            }}>
            <Image
              source={require('../../assets/images/phone-call.png')}
              style={{
                width: '60%',
                height: '60%',
                resizeMode: 'stretch',
                tintColor: myColor.iconcolor,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableOpacity>
  </View>
);
