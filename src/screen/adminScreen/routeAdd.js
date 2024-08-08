import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ToastAndroid,
  Keyboard,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {Dropdown} from 'react-native-element-dropdown';
import {myColor} from '../../constants/myColor';
import {MyButton} from '../../components/myButton';
import {fontFamilies} from '../../constants/fontFamilies';
import {formatDate, convertDateFormat} from '../../constants/formatDate';
import {addBusAction} from '../../redux/actions/busAction';
const {height, width} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import {fetchDataProvince} from '../../api/location';
import {MyStatusBar} from '../../components/myStatusBar';

const AddRoute = ({validModal, setValidModal}) => {
  const {buses} = useSelector(state => state.bus);
  const [dataProvince, setDataProvince] = useState([]);

  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);

  const [bus_id, setBus_id] = useState(null);
  const [isFocusPlate, setIsFocusPlate] = useState(false);

  const [start_point, setStart_point] = useState(null);
  const [isFocusStartP, setIsFocusStartP] = useState(false);

  const [end_point, setEnd_point] = useState(null);
  const [isFocusEndP, setIsFocusEndP] = useState(false);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const getDataProvince = async () => {
    const dataP = await fetchDataProvince();
    setDataProvince(dataP.data);
  };
  useEffect(() => {
    getDataProvince();
  }, []);

  // --------------------------------tạo label cho dropdown----------------------------------------

  const renderLabelPlate = () => {
    if (bus_id || isFocusPlate) {
      return (
        <Text style={[styles.label, isFocusPlate && {color: 'blue'}]}>
          Chọn xe
        </Text>
      );
    }
    return null;
  };

  const renderLabelStartP = () => {
    if (start_point || isFocusStartP) {
      return (
        <Text style={[styles.label, isFocusStartP && {color: 'blue'}]}>
          Xuất phát
        </Text>
      );
    }
    return null;
  };

  const renderLabelEndP = () => {
    if (end_point || isFocusEndP) {
      return (
        <Text style={[styles.label, isFocusEndP && {color: 'blue'}]}>
          Đến nơi
        </Text>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          height: 75,
          backgroundColor: myColor.headerColor,
        }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            position: 'absolute',
            paddingTop: StatusBar.currentHeight + 10,
            marginLeft: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/images/arrow-small-left.png')}
            style={{width: 40, height: 40, tintColor: '#FFFFFF'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#FFFFFF',
            alignSelf: 'center',
            paddingTop: 15,
            fontSize: 20,
            fontFamily: fontFamilies.Medium,
          }}>
          Thông tin xe
        </Text>
      </View>

      <View style={styles.container}>
        <ScrollView style={styles.modalView}>
          <View style={styles.bodyContainer}>
            {/*------------------------------------------- Thêm biển số xe----------------------------------------- */}
            <View style={styles.containerDrop}>
              {renderLabelPlate()}
              <Dropdown
                style={[styles.dropdown, isFocusPlate && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={buses}
                search
                maxHeight={300}
                labelField="license_plate"
                valueField="_id"
                placeholder={!isFocusPlate ? 'Chọn xe' : '...'}
                searchPlaceholder="Search..."
                value={bus_id}
                onFocus={() => setIsFocusPlate(true)}
                onBlur={() => setIsFocusPlate(false)}
                onChange={item => {
                  setBus_id(item._id);
                  setIsFocusPlate(false);
                }}
              />
            </View>

            {/*------------------------------------------- Thêm ngày bắt đầu------------------------------------------ */}

            <View style={styles.viewText}>
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Ngày bắt đầu"
                  style={styles.textInput}
                />
                <TouchableOpacity style={styles.btn}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/daily-calendar.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/*------------------------------------------- Thêm ngày kết thúc------------------------------------------ */}

            <View style={styles.viewText}>
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Ngày bắt đầu"
                  style={styles.textInput}
                />
                <TouchableOpacity style={styles.btn}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/daily-calendar.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/*------------------------------------------- Thêm nơi bắt đầu----------------------------------------- */}

            <View style={styles.containerDrop}>
              {renderLabelStartP()}
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocusStartP && {borderColor: 'blue'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataProvince}
                search
                maxHeight={300}
                labelField="name"
                valueField="name"
                placeholder={!isFocusStartP ? 'Nơi đi' : '...'}
                searchPlaceholder="Search..."
                value={start_point}
                onFocus={() => setIsFocusStartP(true)}
                onBlur={() => setIsFocusStartP(false)}
                onChange={item => {
                  setStart_point(item.name);
                  setIsFocusStartP(false);
                }}
              />
            </View>

            {console.log(end_point)}
            {/*------------------------------------------- Thêm nơi kết thúc----------------------------------------- */}

            <View style={styles.containerDrop}>
              {renderLabelEndP()}
              <Dropdown
                style={[styles.dropdown, isFocusEndP && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataProvince}
                search
                maxHeight={300}
                labelField="name"
                valueField="name"
                placeholder={!isFocusEndP ? 'Nơi nến' : '...'}
                searchPlaceholder="Search..."
                value={end_point}
                onFocus={() => setIsFocusEndP(true)}
                onBlur={() => setIsFocusEndP(false)}
                onChange={item => {
                  setEnd_point(item.name);
                  setIsFocusEndP(false);
                }}
              />
            </View>

            {/*------------------------------------------- Giờ xuất phát ------------------------------------------ */}

            <View style={styles.viewText}>
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Giờ xuất phát"
                  style={styles.textInput}
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setOpen(true)}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/daily-calendar.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <DatePicker
              modal
              is24hourSource="locale"
              mode="time"
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            {/*------------------------------------------- Thời gian di chuyển ------------------------------------------ */}

            <View style={styles.viewText}>
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Thời gian di chuyển"
                  style={styles.textInput}
                />
                <TouchableOpacity style={styles.btn}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/daily-calendar.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/*------------------------------------------- số ngày / lượt ------------------------------------------ */}

            <View style={styles.viewText}>
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="......"
                  keyboardType="numeric"
                  style={[styles.textInput, {width: '50%'}]}
                />
                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 20}}>ngày / tuyến </Text>
                </View>
              </View>
            </View>

            {/*------------------------------- Button tuyến đường------------------------------- */}

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 30,
                marginBottom: 20,
              }}>
              <MyButton
                nameBtn={'Thêm tuyến'}
                onPress={async () => {
                  if (verifyAll()) {
                    await addBus();
                    setLicense_plate('');
                    setNumSeats('');
                    setBrand(null);
                    setType(null);
                    setColor('');
                    setRegistration_date(null);
                    setValidModal(false);
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    marginTop: 30,
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
  },
  modalHeader: {
    height: 70,
    backgroundColor: myColor.headerColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  textHeader: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },

  bodyContainer: {
    flex: 1,
    alignItems: 'center',
  },

  containerDrop: {
    backgroundColor: 'white',
    paddingTop: 20,
    width: '90%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    elevation: 5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 20,
    color: '#AAAAAA',
  },
  selectedTextStyle: {
    fontSize: 20,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    elevation: 10,
    backgroundColor: 'white',
  },
  viewText: {
    width: '90%',
    paddingTop: 20,
  },

  viewInput: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 20,
    height: 50,
    width: '78%',
  },
  btn: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default AddRoute;
