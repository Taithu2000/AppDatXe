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
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {Dropdown} from 'react-native-element-dropdown';
import {myColor} from '../../constants/myColor';
import {MyButton} from '../../components/myButton';
import {formatDate} from '../../constants/formatDate';
import {useSelector, useDispatch} from 'react-redux';
import {updateBus} from '../../redux/actions/busAction';
import {formatDateFromISOString} from '../../constants/formatDate';
import axios from 'axios';
const {height, width} = Dimensions.get('window');
const IP = 'http://10.0.2.2:3306';

const BusUpdate = ({validModal, setValidModal}) => {
  const dataType = [
    {label: 'Giường nằm', value: 'Giường nằm'},
    {label: 'Limousine ', value: 'Limousine'},
    {label: 'Du lịch 16 chỗ', value: 'Du lịch 16 chỗ'},
  ];

  const dataBrand = [
    {label: 'Hyundai', value: 'Hyundai'},
    {label: 'Thaco ', value: 'Thaco'},
    {label: 'Gaz', value: 'Gaz'},
    {label: 'Iveco', value: 'Iveco'},
    {label: 'King Long ', value: 'King Long'},
    {label: 'Mercedes Benz', value: 'Mercedes Benz'},
  ];

  const {bus} = useSelector(state => state.bus);
  const dispatch = useDispatch();

  const date = useRef(new Date()).current;
  const [open, setOpen] = useState(false);
  const [license_plate, setLicense_plate] = useState(bus.license_plate);
  const [type, setType] = useState(bus.type);
  const [brand, setBrand] = useState(bus.brand);
  const [registration_date, setRegistration_date] = useState(
    bus.registration_date,
  );
  const [color, setColor] = useState(bus.color);
  const [num_Seats, setNumSeats] = useState(bus.num_Seats);

  // biến kiểm tra thông tin

  const [validPlate, setValidPlate] = useState(true);
  const [validDate, setValidDate] = useState(true);
  const [validType, setValidType] = useState(true);
  const [validBrand, setValidBrand] = useState(true);
  const [validNumseats, setValidNumseats] = useState(true);

  //kiểm tra biển số
  const verifyPlate = plate => {
    const regex = new RegExp(/^[0-9]{2}[A-Z]\-[0-9]{5}$/);

    if (!plate || regex.test(plate)) return true;
    else return false;
  };

  // kiểm tra thông tin
  const verifyAll = () => {
    let flag = true;

    if (!verifyPlate(license_plate) || !license_plate) {
      setValidPlate(false);
      flag = false;
    }
    if (!registration_date) {
      setValidDate(false);
      flag = false;
    }
    if (!type) {
      setValidType(false);
      flag = false;
    }
    if (!brand) {
      setValidBrand(false);
      flag = false;
    }

    if (!num_Seats) {
      setValidNumseats(false);
      flag = false;
    }

    return flag;
  };

  //goi API cập nhật thông tin
  const updateBusData = async () => {
    const data = {
      license_plate,
      type,
      registration_date,
      brand,
      color,
      num_Seats,
      image: '',
    };

    const response = await dispatch(updateBus(bus._id, data));
    if (response) {
      ToastAndroid.show('Cập nhật thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        'Không thể cập nhật, thử lại sau !',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={validModal}
      onRequestClose={() => {
        setValidModal(!validModal);
      }}>
      <View style={styleModel.container}>
        <View style={styleModel.modalView}>
          <View style={styleModel.modalHeader}>
            <Text style={styleModel.textHeader}>Cập nhật thông tin</Text>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                justifyContent: 'center',
                right: 10,
                paddingTop: 4,
              }}
              onPress={() => setValidModal(false)}>
              <Image
                source={require('../../assets/images/circle-xmark.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>

          <View style={styleModel.bodyContainer}>
            {/*------------------------------------------- Biển số------------------------------------------ */}
            {/*------------------------------------------- Biển số------------------------------------------ */}
            {/*------------------------------------------- Biển số------------------------------------------ */}

            <View style={styleModel.viewText}>
              <Text style={styleModel.textBody}>Biển số</Text>
              <TextInput
                style={styleModel.textInput}
                onChangeText={text => {
                  setLicense_plate(text);
                  setValidPlate(verifyPlate(text));
                }}
                value={license_plate}
              />
            </View>

            <View style={{height: 20, width: '100%'}}>
              <Text style={styleModel.textValid}>
                {validPlate ? '' : ' Nhập sai định dạng!'}
              </Text>
            </View>

            {/*------------------------------- Đăng kiểm------------------------------- */}

            <View style={styleModel.viewText}>
              <Text style={styleModel.textBody}>Đăng kiểm</Text>

              <View
                style={{
                  width: '65%',
                  height: 40,
                  borderRadius: 10,
                  borderWidth: 1,

                  color: '#000000',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={{
                    fontSize: 18,
                    color: '#000000',
                    paddingLeft: 5,
                    width: '80%',
                    height: 40,
                  }}
                  editable={false}
                  placeholder="DD/MM/YYYY"
                  value={formatDateFromISOString(registration_date)}
                />

                <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setOpen(true)}>
                  <Image
                    source={require('../../assets/images/daily-calendar.png')}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{height: 20, width: '100%'}}>
              <Text style={styleModel.textValid}>
                {validDate ? '' : 'Chưa chọn ngày!'}
              </Text>
            </View>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setRegistration_date(formatDate(date));
                setValidDate(true);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            {/*------------------------------- Thêm loại xe------------------------------- */}

            <View style={styleModel.viewText}>
              <Text style={styleModel.textBody}>Loại xe</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  {color: '#000000'},
                ]}
                inputSearchStyle={[styles.inputSearchStyle, {color: '#000000'}]}
                iconStyle={styles.iconStyle}
                data={dataType}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="Chọn loại xe"
                value={type}
                onChange={item => {
                  setType(item.value);
                  setValidType(true);
                }}
              />
            </View>
            <View style={{height: 20, width: '100%'}}>
              <Text style={styleModel.textValid}>
                {validType ? '' : 'Chưa chọn loại xe!'}
              </Text>
            </View>

            {/*------------------------------- Thêm hãng xe------------------------------- */}

            <View style={styleModel.viewText}>
              <Text style={styleModel.textBody}>Hãng xe</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  {color: '#000000'},
                ]}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataBrand}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="Chọn hãng xe"
                value={brand}
                onChange={item => {
                  setBrand(item.value);
                  setValidBrand(true);
                }}
              />
            </View>
            <View style={{height: 20, width: '100%'}}>
              <Text style={styleModel.textValid}>
                {validBrand ? '' : 'Chưa chọn hãng xe!'}
              </Text>
            </View>

            {/*------------------------------- Thêm màu xe------------------------------- */}

            <View style={styleModel.viewText}>
              <Text style={styleModel.textBody}>Màu xe</Text>
              <TextInput
                style={[styleModel.textInput]}
                placeholder="Đen-Đỏ"
                onChangeText={setColor}
                value={color}
              />
            </View>

            <View style={{height: 20, width: '100%'}}>
              <Text style={styleModel.textValid}></Text>
            </View>

            {/*-------------------------------Thêm số ghế------------------------------ */}

            <View style={{width: '50%'}}>
              <View style={styleModel.viewText}>
                <Text style={styleModel.textBody}>Số ghế</Text>
                <TextInput
                  style={[styleModel.textInput, {width: '30%'}]}
                  keyboardType={'numeric'}
                  onChangeText={text => {
                    setNumSeats(text);
                    setValidNumseats(true);
                  }}
                  value={`${num_Seats}`}
                />
              </View>

              <View style={{height: 20, width: '100%'}}>
                <Text style={[{marginLeft: '70%', color: 'red'}]}>
                  {validNumseats ? '' : '!!?????!!'}
                </Text>
              </View>
              <View></View>
            </View>

            {/*------------------------------- Button Thêm xe------------------------------- */}

            <View
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 10,
                alignSelf: 'center',
              }}>
              <MyButton
                nameBtn={'Cập nhật'}
                onPress={async () => {
                  if (verifyAll()) {
                    await updateBusData();
                    setValidModal(false);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderWidth: 1,
    borderColor: '#888888',
    width: '65%',
    borderRadius: 10,
    padding: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
  },
});

const styleModel = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 30,
    height: '75%',
    width: '90%',
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
    padding: 10,
  },

  viewText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  textBody: {
    color: '#000000',
    fontSize: 18,
  },
  textInput: {
    color: '#000000',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    width: '65%',
    paddingLeft: 5,
    paddingRight: 5,
    height: 40,
    borderColor: '#888888',
  },

  textValid: {
    color: 'red',
    marginLeft: '35%',
  },
});

const style = StyleSheet.create({});

export default BusUpdate;
