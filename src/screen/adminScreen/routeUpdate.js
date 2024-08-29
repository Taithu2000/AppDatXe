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
import {MyButton} from '../../components/button/myButton';
import {updateRouteData} from '../../redux/actions/routeAction';
import {getSeatAPI, deleteSeatByDates} from '../../api/seat';
import MyCalendarFull from '../../components/calendar/myCalendarFull';
import MyDropdown from '../../components/myDropdown';
import MyPickerHours from '../../components/calendar/MyPickerHours';
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

  const date = dayjs().startOf('day');

  const [bus_id, setBus_id] = useState(route.bus_id);
  const [isFocusPlate, setIsFocusPlate] = useState(false);
  const [end_date, setEnd_date] = useState(route.end_date);
  const [isModalend_date, setIsModalend_date] = useState(false);
  const [select_end_date, setSelect_end_date] = useState(dayjs());

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
      end_date,
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

            <TouchableOpacity
              style={styles.viewText}
              onPress={() => {
                setIsModalend_date(true);
              }}>
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
            </TouchableOpacity>

            <MyCalendarFull
              visible={isModalend_date}
              minDate={date}
              maxDate={route.end_date}
              date={select_end_date}
              onChange={params => {
                setSelect_end_date(params.date);
              }}
              onPressbtnLater={() => {
                setIsModalend_date(false);
                setEnd_date(select_end_date);
              }}
              onPressbtnSelect={() => {
                setIsModalend_date(false);
                setEnd_date(select_end_date);
              }}
            />
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

              <TouchableOpacity
                style={styles.viewInput}
                onPress={() => setIsDeparture_time(true)}>
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
              </TouchableOpacity>
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

              <TouchableOpacity
                style={styles.viewInput}
                onPress={() => {
                  setIsTotal_time(true);
                }}>
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
              </TouchableOpacity>
            </View>

            <MyPickerHours
              visible={isTotal_time}
              selectedIndex={selectedIndex}
              options={dataTotal_time}
              onChange={index => setSelectedIndex(index)}
              onPressCancel={() => {
                setIsTotal_time(false);
              }}
              onPressSelect={() => {
                setTotal_time(dataTotal_time[selectedIndex]);
                setIsTotal_time(false);
              }}
            />

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
