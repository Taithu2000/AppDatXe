import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {myColor} from '../../constants/myColor';
import {MyButton} from '../../components/myButton';
import {fontFamilies} from '../../constants/fontFamilies';
import {useDispatch, useSelector} from 'react-redux';
import {addRouteData} from '../../redux/actions/routeAction';
import {fetchDataProvince} from '../../api/location';
import {MyStatusBar} from '../../components/myStatusBar';
import dayjs from 'dayjs';
import MyCaledarFull from '../../components/myCaledarFull';
import MyDropdown from '../../components/myDropdown';
import MyPickerHours from '../../components/MyPickerHours';

const AddRoute = ({navigation, route: myRoute}) => {
  const dispatch = useDispatch();

  const {buses} = useSelector(state => state.bus);
  const [dataProvince, setDataProvince] = useState([]);

  const date = dayjs().startOf('day');

  const [bus_id, setBus_id] = useState(null);
  const [isFocusPlate, setIsFocusPlate] = useState(false);

  const [start_date, setStart_date] = useState(null);
  const [isModalstart_date, setIsModalstart_date] = useState(false);
  const [select_start_date, setSelect_start_date] = useState(new Date());

  const [end_date, setEnd_date] = useState(null);
  const [isModalend_date, setIsModalend_date] = useState(false);
  const [select_end_date, setSelect_end_date] = useState(new Date());

  const [start_point, setStart_point] = useState(null);
  const [isFocusStartP, setIsFocusStartP] = useState(false);

  const [end_point, setEnd_point] = useState(null);
  const [isFocusEndP, setIsFocusEndP] = useState(false);

  const [dateDeparture_time, setDateDeparture_time] = useState(new Date());

  const [departure_time, setDeparture_time] = useState(null);
  const [isDeparture_time, setIsDeparture_time] = useState(false);

  const [total_time, setTotal_time] = useState(null);
  const [dataTotal_time, setDataTotal_time] = useState(['']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTotal_time, setIsTotal_time] = useState(false);

  const [date_interval, setDate_interval] = useState(null);
  const [validFormatInterval, setValidFormatInterval] = useState(true);

  const [total_seats, setTotal_seats] = useState(null);

  const [validBus_id, setValidBus_id] = useState(true);
  const [validStart_date, setValidStart_date] = useState(true);
  const [validEnd_date, setValidEnd_date] = useState(true);
  const [validStart_point, setValidStart_point] = useState(true);
  const [validEnd_point, setValidEnd_point] = useState(true);
  const [validDeparture_time, setValidDeparture_time] = useState(true);
  const [validTotal_time, setValidTotal_time] = useState(true);
  const [validInterval, setValidInterval] = useState(true);

  useEffect(() => {
    if (myRoute.params) {
      const {bus} = myRoute.params;
      setBus_id(bus._id);
    }
  }, []);

  useEffect(() => {
    if (start_date) {
      setSelect_end_date(start_date);
    }
  }, [start_date]);
  //kiểm tra hợp lệ của số ngày đi/ lượt

  const verifyInterval = date_interval => {
    if (!date_interval) return true;
    let regex = new RegExp(/^[1-9][0-9]{0,2}$/);
    return regex.test(date_interval);
  };

  // kiểm tra thông tin khi nhấn thêm
  const verifyAll = () => {
    let flag = true;
    if (!bus_id) {
      setValidBus_id(false);
      flag = false;
    }
    if (!start_date) {
      setValidStart_date(false);
      flag = false;
    }
    if (!end_date) {
      setValidEnd_date(false);
      flag = false;
    }
    if (!start_point) {
      setValidStart_point(false);
      flag = false;
    }
    if (!end_point) {
      setValidEnd_point(false);
      flag = false;
    }
    if (!departure_time) {
      setValidDeparture_time(false);
      flag = false;
    }
    if (!total_time) {
      setValidTotal_time(false);
      flag = false;
    }

    if (!date_interval || validFormatInterval == false) {
      setValidInterval(false);
      flag = false;
    }
    return flag;
  };

  useEffect(() => {
    const times = [];
    for (let hour = 1; hour <= 48; hour++) {
      for (let minute of ['00', '30']) {
        times.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    }
    setDataTotal_time(times);
  }, []);

  //----------------------------------Tắt bottom tabs--------------------------------------------
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({tabBarStyle: {display: 'none'}});

      return () => {
        parent?.setOptions({tabBarStyle: {display: 'none'}});
      };
    }, [navigation]),
  );
  // --------------------------------gọi data tỉnh thành----------------------------------------

  const getDataProvince = async () => {
    const dataP = await fetchDataProvince();
    setDataProvince(dataP.data);
  };
  useEffect(() => {
    getDataProvince();
  }, []);

  // --------------------------------gọi api để thêm tuyến đường--------------------------------

  const addRoute = async () => {
    const data = {
      bus_id,
      start_date,
      end_date,
      start_point,
      end_point,
      departure_time,
      total_time,
      date_interval,
      total_seats,
    };

    const response = await dispatch(addRouteData(data));

    if (response) {
      ToastAndroid.show('Thêm thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Không thể thêm, thử lại sau !', ToastAndroid.SHORT);
    }
  };

  // --------------------------------tạo label cho dropdown----------------------------------------

  const renderLabelStartDate = () => {
    if (start_date) {
      return (
        <Text style={[styles.label, isFocusPlate && {color: 'blue'}]}>
          Ngày bắt đầu
        </Text>
      );
    }
    return null;
  };

  const renderLabeEndDate = () => {
    if (end_date) {
      return (
        <Text style={[styles.label, isFocusPlate && {color: 'blue'}]}>
          Ngày kết thúc
        </Text>
      );
    }
    return null;
  };

  const renderLabeldDeparture_time = () => {
    if (departure_time) {
      return (
        <Text style={[styles.label, isFocusEndP && {color: 'blue'}]}>
          Giờ xuất phát
        </Text>
      );
    }
    return null;
  };

  const renderLabeldTotal_tiem = () => {
    if (total_time) {
      return (
        <Text style={[styles.label, isFocusEndP && {color: 'blue'}]}>
          Thời gian di chuyển
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
          Thêm tuyến đường
        </Text>
      </View>

      <View style={styles.container}>
        <ScrollView style={styles.modalView}>
          <View style={styles.bodyContainer}>
            {/*------------------------------------------- Thêm biển số xe----------------------------------------- */}

            <MyDropdown
              textLable={'Chọn xe'}
              isFocus={isFocusPlate}
              data={buses}
              labelField={'license_plate'}
              valueField={'_id'}
              placeholder={!isFocusPlate ? 'Chọn xe' : '...'}
              value={bus_id}
              onFocus={() => setIsFocusPlate(true)}
              onBlur={() => setIsFocusPlate(false)}
              onChange={item => {
                setBus_id(item._id);
                setTotal_seats(item.num_Seats);
                setIsFocusPlate(false);
                setValidBus_id(true);
              }}
            />

            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {validBus_id ? '' : 'Chưa chọn xe!'}
              </Text>
            </View>
            {/*------------------------------------------- Thêm ngày bắt đầu------------------------------------------ */}

            <View style={styles.viewText}>
              {renderLabelStartDate()}
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Ngày bắt đầu"
                  style={styles.textInput}
                  editable={false}
                  value={
                    start_date ? dayjs(start_date).format('DD/MM/YYYY') : ''
                  }
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setIsModalstart_date(true);
                  }}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/daily-calendar.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {validStart_date ? '' : 'Chưa chọn ngày!'}
              </Text>
            </View>

            <MyCaledarFull
              visible={isModalstart_date}
              minDate={date}
              maxDate={end_date ? end_date : new Date('2050-12-31')}
              date={select_start_date}
              onChange={params => {
                setSelect_start_date(params.date);
              }}
              onPressbtnLater={() => {
                setIsModalstart_date(false);
              }}
              onPressbtnSelect={() => {
                setIsModalstart_date(false);
                setStart_date(select_start_date);
                setValidStart_date(true);
              }}
            />

            {/*------------------------------------------- Thêm ngày kết thúc------------------------------------------ */}

            <View style={styles.viewText}>
              {renderLabeEndDate()}
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
            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {' '}
                {validEnd_date ? '' : 'Chưa chọn ngày!'}
              </Text>
            </View>

            <MyCaledarFull
              visible={isModalend_date}
              minDate={start_date ? start_date : date}
              date={select_end_date}
              onChange={params => {
                setSelect_end_date(params.date);
              }}
              onPressbtnLater={() => {
                setIsModalend_date(false);
              }}
              onPressbtnSelect={() => {
                setIsModalend_date(false);

                setEnd_date(select_end_date);

                setValidEnd_date(true);
              }}
            />
            {console.log(date)}

            {/*------------------------------------------- Thêm nơi bắt đầu----------------------------------------- */}

            <MyDropdown
              textLable={'Nơi bắt đầu'}
              isFocus={isFocusStartP}
              data={dataProvince}
              labelField={'name'}
              valueField={'name'}
              placeholder={!isFocusStartP ? 'Nơi bắt đầu' : '...'}
              value={start_point}
              onFocus={() => setIsFocusStartP(true)}
              onBlur={() => setIsFocusStartP(false)}
              onChange={item => {
                setStart_point(item.name);
                setIsFocusStartP(false);
                setValidStart_point(true);
              }}
            />
            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {validStart_point ? '' : 'Chưa chọn địa điểm!'}
              </Text>
            </View>

            {/*------------------------------------------- Thêm nơi kết thúc----------------------------------------- */}

            <MyDropdown
              textLable={'Nơi đến'}
              isFocus={isFocusEndP}
              data={dataProvince}
              labelField={'name'}
              valueField={'name'}
              placeholder={!isFocusEndP ? 'Nơi đến' : '...'}
              value={end_point}
              onFocus={() => setIsFocusEndP(true)}
              onBlur={() => setIsFocusEndP(false)}
              onChange={item => {
                setEnd_point(item.name);
                setIsFocusEndP(false);
                setValidEnd_point(true);
              }}
            />

            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {validEnd_point ? '' : 'Chưa chọn địa điểm!'}
              </Text>
            </View>
            {/*------------------------------------------- Giờ xuất phát ------------------------------------------ */}

            <View style={styles.viewText}>
              {renderLabeldDeparture_time()}
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
            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {validDeparture_time ? '' : 'Chưa chọn giờ đi!'}
              </Text>
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
                setValidDeparture_time(true);
              }}
              onCancel={() => {
                setIsDeparture_time(false);
              }}
            />

            {/*------------------------------------------- Thời gian di chuyển ------------------------------------------ */}

            <View style={styles.viewText}>
              {renderLabeldTotal_tiem()}
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Thời gian di chuyển"
                  style={styles.textInput}
                  value={total_time}
                  editable={false}
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
            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {' '}
                {validTotal_time ? '' : 'Chưa chọn thời gian!'}
              </Text>
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
                setValidTotal_time(true);
                setIsTotal_time(false);
              }}
            />

            {/*------------------------------------------- số ngày / lượt ------------------------------------------ */}

            <View style={styles.viewText}>
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="......"
                  keyboardType="numeric"
                  style={[styles.textInput, {width: '50%'}]}
                  onChangeText={text => {
                    setValidFormatInterval(verifyInterval(text));
                    setValidInterval(true);
                    setDate_interval(text);
                  }}
                  value={date_interval}
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
            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {validInterval ? '' : 'Chưa chọn số ngày!'}
                {validFormatInterval ? '' : 'nhập sai định dạng'}
              </Text>
            </View>

            {/*------------------------------- Button thêm tuyến đường------------------------------- */}

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 30,
                marginBottom: 50,
              }}>
              <MyButton
                nameBtn={'Thêm tuyến'}
                onPress={async () => {
                  if (verifyAll()) {
                    await addRoute();
                    setBus_id(null);
                    setStart_date(null);
                    setEnd_date(null);
                    setStart_point(null);
                    setEnd_point(null);
                    setDeparture_time(null);
                    setTotal_time(null);
                    setDate_interval(null);
                    navigation.goBack();
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
    marginTop: 10,
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
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
    color: '#000000',
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

export default AddRoute;
