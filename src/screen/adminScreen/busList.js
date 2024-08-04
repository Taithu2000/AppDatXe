import React, {useState, useEffect, useRef} from 'react';
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
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {Dropdown} from 'react-native-element-dropdown';
import {MyStatusBar} from '../../components/myStatusBar';
import {myColor} from '../../constants/myColor';
import {fontFamilies, fontFamily} from '../../constants/fontFamilies';
import {getAllbusAPI, addBusAPI} from '../../api/busesAPI';
import {MyButton} from '../../components/myButton';

const {height, width} = Dimensions.get('window');

const formatDate = dateObject => {
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Tháng được tính từ 0 nên cần cộng thêm 1
  const year = dateObject.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatDateFromISOString = isoString => {
  const date = new Date(isoString); // Chuyển đổi chuỗi ISO thành đối tượng Date
  const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và đảm bảo có 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, cần cộng thêm 1
  const year = date.getFullYear(); // Lấy năm

  return `${day}/${month}/${year}`; // Trả về định dạng dd/mm/yyyy
};

//------------------------------------Danh sách Xe----------------------------------------------

const BusList = () => {
  const [buses, setBuses] = useState([]);

  const [validModal, setValidModal] = useState(true);

  const getBuses = async () => {
    const data = await getAllbusAPI();

    setBuses(data);
  };

  useEffect(() => {
    getBuses();
  }, []);
  useEffect(() => {
    console.log(buses);
    if (buses.length > 0) {
      console.log(buses[0]._id);
    }
  }, [buses]);

  const Item = ({item}) => (
    <View style={style.containerItem}>
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
    </View>
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
            renderItem={({item}) => <Item item={item} />}
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
    alignItems: 'center',
    borderColor: '#C0C0C0',
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

{
  /*-------------------------------------- Thêm xe--------------------------------- */
  /*-------------------------------------- Thêm xe--------------------------------- */
  /*-------------------------------------- Thêm xe--------------------------------- */
  /*-------------------------------------- Thêm xe--------------------------------- */
  /*-------------------------------------- Thêm xe--------------------------------- */
}

export const AddBus = ({validModal, setValidModal}) => {
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

  const date = useRef(new Date()).current;
  const [open, setOpen] = useState(false);
  const [license_plate, setLicense_plate] = useState('');
  const [type, setType] = useState(null);
  const [brand, setBrand] = useState(null);
  const [registration_date, setRegistration_date] = useState(null);
  const [color, setColor] = useState('');
  const [num_Seats, setNumSeats] = useState();

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

  //goi API thêm data

  const addBus = async () => {
    const data = {
      license_plate,
      type,
      registration_date,
      brand,
      color,
      num_Seats,
      image: '',
    };

    const response = await addBusAPI(data);
    if (response) {
      ToastAndroid.show('Thêm thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Không thể thêm, thử lại sau !', ToastAndroid.SHORT);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      // visible={modalVisible}
      visible={validModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styleModel.container}>
        <View style={styleModel.modalView}>
          <View style={styleModel.modalHeader}>
            <Text style={style.textHeader}>Thêm xe</Text>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                justifyContent: 'center',
                right: 10,
                paddingTop: 4,
              }}>
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
                placeholder="47A-12345"
                onChangeText={text => {
                  setLicense_plate(text);
                  setValidPlate(verifyPlate(text));
                  console.log(verifyPlate(text));
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
                  value={registration_date}
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
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
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
                selectedTextStyle={styles.selectedTextStyle}
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
                  value={num_Seats}
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
                nameBtn={'Thêm xe'}
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
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const styleModel = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
    fontSize: 16,
  },
  textInput: {
    color: '#000000',
    fontSize: 16,
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
