import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import {myColor} from '../../constants/myColor';
import {fetchDataProvince} from '../../api/location';
import {Search} from '../../components/search';

const SelectProvince = ({visible, setVisible, setValue, title}) => {
  const [province, setProvince] = useState([]);
  const [key, setKey] = useState('');
  const [data, setData] = useState([]);

  const getDataProvince = async () => {
    const data = await fetchDataProvince();
    setProvince(data.data);
  };
  useEffect(() => {
    getDataProvince();
  }, []);

  useEffect(() => {
    const newData = province.filter(data => {
      return data.name.includes(key);
    });
    setData(newData);
  }, [key, province]);
  const slow = () => {
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.containerImg}>
          <View>
            <View style={styles.viewTitle}>
              <Text style={styles.textTitle}>{title}</Text>
            </View>
            <Image
              source={require('../../assets/images/troi-vang.jpg')}
              resizeMode="stretch"
              style={styles.image}
            />
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.headerBody}>
            <TouchableOpacity
              style={styles.btnClose}
              onPress={() => {
                setVisible(false);
              }}>
              <Image
                style={{width: 20, height: 20, tintColor: myColor.buttonColor}}
                source={require('../../assets/images/cross.png')}
              />
            </TouchableOpacity>
            <View style={{height: 30}}></View>

            {/* --------------------------TÌm kiếm-------------------------- */}
            <Search
              onChangeText={text => {
                setKey(text);
              }}
              value={key}
            />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                width: 200,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                bottom: -30,
                position: 'absolute',
                elevation: 5,
              }}>
              <Text style={{fontSize: 18, color: '#000000'}}>
                Chọn tỉnh thành
              </Text>
            </View>
          </View>
          <View style={styles.viewProvince}>
            <FlatList
              data={data}
              renderItem={({item}) => (
                <Item
                  item={item}
                  onPress={() => {
                    setValue(item.name);
                    slow();
                  }}
                />
              )}
              keyExtractor={item => item.id}
              numColumns={2}
              ListFooterComponent={<View style={{height: 50}} />}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Item = ({item, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: '45%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      }}
      onPress={onPress}>
      <Text style={{fontSize: 18, color: '#000000'}}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  containerImg: {
    marginTop: 20,
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderRadius: 15,
  },
  viewTitle: {
    width: '100%',
    height: 170,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 15,
    position: 'absolute',
    zIndex: -1,
  },

  textTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    margin: 30,
    fontWeight: '700',
  },
  bodyContainer: {
    marginTop: -30,
    flex: 1,
  },
  headerBody: {
    height: 120,
    width: '100%',
    backgroundColor: myColor.headerColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  btnClose: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -20,
    left: 20,
  },
  viewProvince: {
    backgroundColor: '#FAFAFA',
    paddingTop: 50,
    zIndex: -1,
    flex: 1,
  },
});

export default SelectProvince;
