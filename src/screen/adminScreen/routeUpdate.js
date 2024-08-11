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
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from 'react-native-ui-datepicker';
import WheelPicker from 'react-native-wheely';

import {Dropdown} from 'react-native-element-dropdown';

import {useDispatch, useSelector} from 'react-redux';
import {fetchDataProvince} from '../../api/location';
import dayjs from 'dayjs';
import {myColor} from '../../constants/myColor';
import {MyButton} from '../../components/myButton';
import {updateRouteData} from '../../redux/actions/routeAction';
import {getSeatAPI, deleteSeatByDates} from '../../api/seat';
import axios from 'axios';
const {height, width} = Dimensions.get('window');
const IP = 'http://10.0.2.2:3306';

const RouteUpdate = ({validModal, setValidModal}) => {
  const dispatch = useDispatch();

  const {route} = useSelector(state => state.route);
  const {buses} = useSelector(state => state.bus);
  const [seat, setSeat] = useState();
  const [dataProvince, setDataProvince] = useState([]);
  const [newBuses, setNewBuses] = useState([]);

  const [date, setDate] = useState(new Date());
  const [yesterday, setYesterday] = useState(
    new Date().setDate(new Date().getDate() - 1),
  );

  const [bus_id, setBus_id] = useState(route.bus_id);
  const [isFocusPlate, setIsFocusPlate] = useState(false);

  const [end_date, setEnd_date] = useState(route.end_date);
  const [isModalend_date, setIsModalend_date] = useState(false);
  const [select_end_date, setSelect_end_date] = useState(new Date());

  const [start_point, setStart_point] = useState(route.start_point);
  const [isFocusStartP, setIsFocusStartP] = useState(false);

  const [end_point, setEnd_point] = useState(route.end_point);
  const [isFocusEndP, setIsFocusEndP] = useState(false);

  const [dateDeparture_time, setDateDeparture_time] = useState(new Date());

  const [departure_time, setDeparture_time] = useState(route.departure_time);
  const [isDeparture_time, setIsDeparture_time] = useState(false);

  const [total_time, setTotal_time] = useState(route.total_time);
  const [dataTotal_time, setDataTotal_time] = useState(['']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTotal_time, setIsTotal_time] = useState(false);

  //------------------------------------------------------------------goi API cập nhật thông tin

  const updateRoute = async () => {
    const data = {
      bus_id,
      end_date: dayjs(end_date).format('YYYY-MM-DD'),
      start_point,
      end_point,
      departure_time,
      total_time,
    };

    const response = await dispatch(updateRouteData(route._id, data));

    await deleteSeatByDates(
      route._id,
      new Date(dayjs(end_date).format('YYYY-MM-DD')),
    );

    if (response) {
      ToastAndroid.show('Cập nhật thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        'Không thể cập nhật, thử lại sau !',
        ToastAndroid.SHORT,
      );
    }
  };

  // lấy tông tin của seat để so sánh số ghế với buses
  useEffect(() => {
    const getSeat = async () => {
      const data = await getSeatAPI(route._id);
      setSeat(data);
    };
    getSeat();
  }, []);

  useEffect(() => {
    if (seat) {
      const data = buses.filter(bus => {
        return bus.num_Seats == seat.total_seats;
      });
      setNewBuses(data);
    }
  }, [seat]);

  //tạo data địa điểm

  const getDataProvince = async () => {
    const dataP = await fetchDataProvince();
    setDataProvince(dataP.data);
  };
  useEffect(() => {
    getDataProvince();
  }, []);

  //tạo data thời gian di chuyển

  useEffect(() => {
    const times = [];
    for (let hour = 1; hour <= 48; hour++) {
      for (let minute of ['00', '30']) {
        times.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    }
    setDataTotal_time(times);
  }, []);

  // so sánh ngày bắt đầu với ngày hiện tại
  const compareDate = () => {
    return (
      new Date(dayjs(route.start_date).format('YYYY-MM-DD')).getTime() >=
      new Date(dayjs(date).format('YYYY-MM-DD')).getTime()
    );
  };

  useEffect(() => {
    if (compareDate()) {
      setSelect_end_date(route.start_date);
    }
  }, []);

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

          <View style={styles.bodyContainer}>
            {/*------------------------------------------- Cập nhật biển số xe----------------------------------------- */}
            <View style={styles.containerDrop}>
              <Text style={{fontSize: 16}}>Xe</Text>
              <Dropdown
                style={[styles.dropdown, isFocusPlate && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={newBuses}
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
                  //   setTotal_seats(item.num_Seats);
                  setIsFocusPlate(false);
                }}
              />
            </View>

            {/*------------------------------------------- Cập nhật ngày kết thúc------------------------------------------ */}

            <View style={styles.viewText}>
              <Text style={{fontSize: 16}}>Ngày kết thúc</Text>

              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Ngày kết thúc"
                  style={styles.textInput}
                  editable={false}
                  value={end_date ? dayjs(end_date).format('DD/MM/YYYY') : ''}
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setIsModalend_date(true);
                  }}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/daily-calendar.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Modal visible={isModalend_date} transparent={true}>
              <View style={styles.modalCaledar}>
                <View style={styles.viewCaledar}>
                  <DateTimePicker
                    mode="single"
                    headerContainerStyle={{
                      backgroundColor: myColor.headerColor,
                    }}
                    headerTextStyle={{color: '#FFFFFF', fontSize: 18}}
                    headerButtonColor={'#FFFFFF'}
                    weekDaysTextStyle={{color: '#000000', fontSize: 16}}
                    selectedItemColor={myColor.headerColor}
                    minDate={compareDate() ? route.start_date : yesterday}
                    maxDate={route.end_date}
                    date={select_end_date}
                    onChange={params => {
                      setSelect_end_date(params.date);
                    }}
                  />

                  <View
                    style={{
                      marginBottom: 10,
                      marginTop: -20,
                      width: '95%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View></View>
                    <View></View>

                    <TouchableOpacity
                      style={styles.btnCalendar}
                      onPress={() => {
                        setIsModalend_date(false);
                        setEnd_date(select_end_date);
                      }}>
                      <Text style={{color: '#FFFFFF', fontSize: 18}}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnCalendar}
                      onPress={() => {
                        setIsModalend_date(false);
                        setEnd_date(select_end_date);
                      }}>
                      <Text style={{color: '#FFFFFF', fontSize: 18}}>Chọn</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/*------------------------------------------- Cập nhật nơi bắt đầu----------------------------------------- */}

            <View style={styles.containerDrop}>
              <Text style={{fontSize: 16}}>Nơi xuất phát</Text>
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
                placeholder={!isFocusStartP ? 'Nơi bắt đầu' : '...'}
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

            {/*------------------------------------------- Cập nhật nơi kết thúc----------------------------------------- */}

            <View style={styles.containerDrop}>
              <Text style={{fontSize: 16}}>Nơi đến</Text>
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
              <Text style={{fontSize: 16}}> Giờ xuất phát </Text>

              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Giờ xuất phát"
                  style={styles.textInput}
                  editable={false}
                  value={departure_time ? departure_time : ''}
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setIsDeparture_time(true)}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/time-quarter-to.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <DatePicker
              modal
              is24hourSource="locale"
              mode="time"
              open={isDeparture_time}
              date={dateDeparture_time}
              onConfirm={date => {
                setIsDeparture_time(false);
                setDeparture_time(dayjs(date).format('HH:mm'));
              }}
              onCancel={() => {
                setIsDeparture_time(false);
              }}
            />

            {/*------------------------------------------- Thời gian di chuyển ------------------------------------------ */}

            <View style={styles.viewText}>
              <Text style={{fontSize: 16}}> Thời gian di chuyển </Text>

              <View style={styles.viewInput}>
                <TextInput
                  editable={false}
                  placeholder="Thời gian di chuyển"
                  style={styles.textInput}
                  value={total_time}
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setIsTotal_time(true);
                  }}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/duration-alt.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Modal visible={isTotal_time} transparent={true}>
              <View style={styles.modalCaledar}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    width: '60%',
                    height: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                  }}>
                  <View
                    style={{
                      backgroundColor: myColor.headerColor,
                      width: '100%',
                      height: 50,
                      position: 'absolute',
                      top: 0,
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#FFFFFF',
                        fontSize: 18,
                        marginTop: 10,
                      }}>
                      Chọn giờ di chuyển
                    </Text>
                  </View>

                  <WheelPicker
                    selectedIndex={selectedIndex}
                    itemStyle
                    itemTextStyle={{color: 'black', fontSize: 20}}
                    containerStyle={{
                      width: 100,
                      fontsize: 20,
                    }}
                    selectedIndicatorStyle={{
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      width: 100,
                      fontsize: 20,
                    }}
                    visibleRest={1}
                    options={dataTotal_time}
                    onChange={index => setSelectedIndex(index)}
                  />

                  <View
                    style={{
                      width: '100%',
                      height: 50,
                      position: 'absolute',
                      bottom: 0,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      style={styles.btnCalendar}
                      onPress={() => {
                        setIsTotal_time(false);
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: '#FFFFFF',
                          fontSize: 18,
                        }}>
                        Hủy
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnCalendar}
                      onPress={() => {
                        setTotal_time(dataTotal_time[selectedIndex]);
                        setIsTotal_time(false);
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: '#FFFFFF',
                          fontSize: 18,
                        }}>
                        Chọn
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/*------------------------------- Button Cập nhật tuyến đường------------------------------- */}

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 30,
                position: 'absolute',
                bottom: 10,
              }}>
              <MyButton
                nameBtn={'Cập nhật'}
                onPress={async () => {
                  await updateRoute();
                  setValidModal(false);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styleModel = StyleSheet.create({
  container: {
    height: height,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 30,
    height: '85%',
    width: '95%',
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
});

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
  },

  containerDrop: {
    backgroundColor: 'white',
    paddingTop: 10,
    width: '90%',
  },
  dropdown: {
    height: 40,
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

  placeholderStyle: {
    fontSize: 18,
    color: '#AAAAAA',
  },
  selectedTextStyle: {
    fontSize: 18,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
    elevation: 10,
    backgroundColor: 'white',
  },
  viewText: {
    width: '90%',
    paddingTop: 10,
  },

  viewInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 18,
    height: 40,
    width: '78%',
    color: '#000000',
  },
  btn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    tintColor: myColor.iconcolor,
  },

  modalCaledar: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCaledar: {width: '90%', backgroundColor: '#FFF'},

  btnCalendar: {
    width: 80,
    height: 40,
    backgroundColor: myColor.buttonColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RouteUpdate;
