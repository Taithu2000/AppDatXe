import React, {useState, useEffect, useCallback, useRef} from 'react';
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
import {fetchDataProvince} from '../../api/location';
import {MyStatusBar} from '../../components/myStatusBar';
import MyDropdown from '../../components/myDropdown';
import MyPickerHours from '../../components/MyPickerHours';
import {
  updateTripById,
  updateManyTripByGroupId,
  deleteTripById,
  deleteManyTripByGroupId,
} from '../../api/tripsAPI';
import {ButtonDel} from '../../components/buttonDel';
import DialogSelect from '../../components/dialogSelect';
import {compareHourNow_Departure_time} from '../../constants/fomatHH-mm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const TripDetails = ({navigation, route: myRoute}) => {
  const trip = myRoute.params.item;

  const [today, setToday] = useState(dayjs().startOf('day'));

  const [dataProvince, setDataProvince] = useState([]);

  const [start_point, setStart_point] = useState(trip.start_point);
  const [isFocusStartP, setIsFocusStartP] = useState(false);

  const [pickup, setPickup] = useState(trip.pickup);

  const [end_point, setEnd_point] = useState(trip.end_point);
  const [isFocusEndP, setIsFocusEndP] = useState(false);

  const [drop_off, setDrop_off] = useState(trip.drop_off);

  const [datePickupTime, setdatePickupTime] = useState(new Date());

  const [pickupTime, setPickupTime] = useState(trip.pickupTime);
  const [isPickupTime, setIsPickUpTime] = useState(false);

  const [totalTime, setTotalTime] = useState(trip.totalTime);
  const [dataTotalTime, setDataTotalTime] = useState(['']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTotalTime, setIsTotalTime] = useState(false);

  const [ticket_price, setTicket_price] = useState(trip.ticket_price);
  const [validFormatTicket, setValidFormatTicket] = useState(true);

  const [validStart_point, setValidStart_point] = useState(true);
  const [validPickup, setValidPickup] = useState(true);
  const [validDrop_off, setValidDrop_off] = useState(true);

  const [validEnd_point, setValidEnd_point] = useState(true);
  const [validpickupTime, setValidpickupTime] = useState(true);
  const [validTotalTime, setValidTotalTime] = useState(true);
  const [validTicket, setValidTicket] = useState(true);

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [checkUpdate, setCheckUpdate] = useState(0);

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [checkDelete, setCheckDelete] = useState(0);

  //kiểm tra hợp lệ của số ngày đi/ lượt

  const verifyTicket = ticket_price => {
    if (!ticket_price) return true;
    let regex = new RegExp(/^[0-9]{1,10}$/);
    return regex.test(ticket_price);
  };

  // kiểm tra thông tin khi nhấn thêm
  const verifyAll = () => {
    let flag = true;

    if (!start_point) {
      setValidStart_point(false);
      flag = false;
    }

    if (!pickup) {
      setValidPickup(false);
      flag = false;
    }
    if (!end_point) {
      setValidEnd_point(false);
      flag = false;
    }

    if (!drop_off) {
      setValidDrop_off(false);
      flag = false;
    }
    if (!pickupTime) {
      setValidpickupTime(false);
      flag = false;
    }
    if (!totalTime) {
      setValidTotalTime(false);
      flag = false;
    }

    if (!drop_off) {
      setValidDrop_off(false);
      flag = false;
    }

    if (!ticket_price) {
      setValidTicket(false);
      flag = false;
    }

    return flag;
  };

  //-------------------------------------Kiểm tra thời gian để ẩn nút sửa xóa//-------------------------------------

  const checkDisableBtn = () => {
    if (new Date(today).getTime() > new Date(trip.trip_date).getTime()) {
      return true;
    } else if (new Date(today).getTime() < new Date(trip.trip_date).getTime()) {
      return false;
    } else {
      if (compareHourNow_Departure_time(trip.pickupTime)) {
        return false;
      } else {
        return true;
      }
    }
  };


  //----------------------------------thêm giá trị vào pickerHours--------------------------------------------

  useEffect(() => {
    const times = [];
    for (let hour = 1; hour <= 48; hour++) {
      for (let minute of ['00', '30']) {
        times.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    }
    setDataTotalTime(times);
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

  // -------------------------------------------------gọi api ----------------------------------------

  // -----------------------UpdateOne------------------------
  const updateTrip = async () => {
    const data = {
      start_point,
      end_point,
      pickup,
      drop_off,
      pickupTime,
      totalTime,
      ticket_price,
    };
    const response = await updateTripById(trip._id, data);
    if (response) {
      ToastAndroid.show('Sửa thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Không thể sửa, thử lại sau !', ToastAndroid.SHORT);
    }
  };

  // -----------------------UpdateMany-----------------------
  const updateManyTrip = async () => {
    const data = {
      start_point,
      end_point,
      pickup,
      drop_off,
      pickupTime,
      totalTime,
      ticket_price,
    };
    const response = await updateManyTripByGroupId(
      trip.groupId,
      trip.trip_date,
      data,
    );
    if (response) {
      ToastAndroid.show('Sửa thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Không thể sửa, thử lại sau !', ToastAndroid.SHORT);
    }
  };

  // -----------------------Delete One------------------------
  const deleteTrip = async () => {
    const response = await deleteTripById(trip._id);
    if (response) {
      ToastAndroid.show('Xóa thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Không thể xóa, thử lại sau !', ToastAndroid.SHORT);
    }
  };

  // -----------------------Delete Many------------------------
  const deleteManyTrip = async () => {
    const response = await deleteManyTripByGroupId(
      trip.groupId,
      trip.trip_date,
    );
    if (response) {
      ToastAndroid.show('Xóa thành công !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Không thể xóa, thử lại sau !', ToastAndroid.SHORT);
    }
  };

  // --------------------------------tạo label cho dropdown----------------------------------------

  const renderLabeldPickup = () => {
    if (pickup) {
      return (
        <Text style={[styles.label, isFocusEndP && {color: 'blue'}]}>
          Điểm đón
        </Text>
      );
    }
    return null;
  };

  const renderLabeldDrop_off = () => {
    if (drop_off) {
      return (
        <Text style={[styles.label, isFocusEndP && {color: 'blue'}]}>
          Điểm trả
        </Text>
      );
    }
    return null;
  };
  const renderLabeldpickupTime = () => {
    if (pickupTime) {
      return (
        <Text style={[styles.label, isFocusEndP && {color: 'blue'}]}>
          Giờ xuất phát
        </Text>
      );
    }
    return null;
  };

  const renderLabeldTotal_tiem = () => {
    if (totalTime) {
      return (
        <Text style={[styles.label, isFocusEndP && {color: 'blue'}]}>
          Thời gian di chuyển
        </Text>
      );
    }
    return null;
  };

  const renderLabeldTicket = () => {
    if (ticket_price) {
      return (
        <Text style={[styles.label, isFocusEndP && {color: 'blue'}]}>
          Giá vé
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
          Chi tiết lộ trình
        </Text>
      </View>

      <View style={styles.container}>
        <ScrollView style={styles.modalView}>
          <View style={styles.bodyContainer}>
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

            {/*------------------------------------------- Điểm đón ------------------------------------------ */}

            <View style={styles.viewText}>
              {renderLabeldPickup()}

              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Điểm đón"
                  style={[styles.textInput]}
                  onChangeText={text => {
                    setValidPickup(true);
                    setPickup(text);
                  }}
                  value={pickup}
                />
              </View>
            </View>
            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {validPickup ? '' : 'Chưa có điểm đón!'}
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

            {/*-------------------------------------------Điểm trả----------------------------------------- */}

            <View style={styles.viewText}>
              {renderLabeldDrop_off()}

              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Điểm trả"
                  style={[styles.textInput]}
                  onChangeText={text => {
                    setValidDrop_off(true);
                    setDrop_off(text);
                  }}
                  value={drop_off}
                />
              </View>
            </View>
            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {validDrop_off ? '' : 'Chưa có điểm trả!'}
              </Text>
            </View>

            {/*------------------------------------------- Giờ xuất phát ------------------------------------------ */}

            <View style={styles.viewText}>
              {renderLabeldpickupTime()}
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Giờ đón"
                  style={styles.textInput}
                  editable={false}
                  value={pickupTime ? pickupTime : ''}
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setIsPickUpTime(true)}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/time-quarter-to.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {validpickupTime ? '' : 'Chưa chọn giờ đi!'}
              </Text>
            </View>

            <DatePicker
              modal
              is24hourSource="locale"
              mode="time"
              open={isPickupTime}
              date={datePickupTime}
              onConfirm={date => {
                setIsPickUpTime(false);
                setPickupTime(dayjs(date).format('HH:mm'));
                setValidpickupTime(true);
              }}
              onCancel={() => {
                setIsPickUpTime(false);
              }}
            />

            {/*------------------------------------------- Thời gian di chuyển ------------------------------------------ */}

            <View style={styles.viewText}>
              {renderLabeldTotal_tiem()}
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Thời gian di chuyển"
                  editable={false}
                  style={styles.textInput}
                  value={totalTime}
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setIsTotalTime(true);
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
                {validTotalTime ? '' : 'Chưa chọn thời gian!'}
              </Text>
            </View>

            <MyPickerHours
              visible={isTotalTime}
              selectedIndex={selectedIndex}
              options={dataTotalTime}
              onChange={index => setSelectedIndex(index)}
              onPressCancel={() => {
                setIsTotalTime(false);
              }}
              onPressSelect={() => {
                setTotalTime(dataTotalTime[selectedIndex]);
                setValidTotalTime(true);
                setIsTotalTime(false);
              }}
            />

            {/*------------------------------------------- Giá vé ------------------------------------------ */}

            <View style={styles.viewText}>
              {renderLabeldTicket()}

              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Giá vé"
                  //   keyboardType="numeric"
                  style={[styles.textInput]}
                  onChangeText={text => {
                    setValidTicket(true);
                    setTicket_price(text.replace(/\D/g, ''));
                  }}
                  value={`${ticket_price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}
                />
              </View>
            </View>
            <View style={{height: 20, width: '90%'}}>
              <Text style={{color: 'red'}}>
                {validTicket ? '' : 'Chưa nhập giá vé!'}
                {validFormatTicket ? '' : 'nhập sai định dạng'}
              </Text>
            </View>

            {/*------------------------------- Button thêm lộ trình------------------------------- */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
                marginBottom: 50,
                width: '90%',
              }}>
              <View
                style={{
                  width: '60%',
                  alignSelf: 'center',
                }}>
                <MyButton
                  nameBtn={'Cập nhật'}
                  onPress={() => {
                    setIsOpenUpdate(true);
                  }}
                  isDisabled={checkDisableBtn()}
                />
              </View>
              <DialogSelect
                visible={isOpenUpdate}
                title={'Cập nhật'}
                text0={'Chỉ cập nhật cho ngày hôm nay'}
                text1={'Cập nhật tất cả các ngày về sau'}
                checked={checkUpdate}
                setChecked={setCheckUpdate}
                onPressCancel={() => setIsOpenUpdate(false)}
                onPressBtn={async () => {
                  if (checkUpdate === 0) {
                    await updateTrip();
                  } else {
                    await updateManyTrip();
                  }
                  setIsOpenUpdate(false);
                }}
                colorBtn={myColor.buttonColor}
                textBtn={'Cập nhật'}
              />
              {/*------------------------------- Button xóa lộ trình------------------------------- */}
              <View style={{width: '30%'}}>
                <ButtonDel
                  disabled={checkDisableBtn()}
                  onPress={() => {
                    setIsOpenDelete(true);
                  }}
                />
              </View>

              <DialogSelect
                visible={isOpenDelete}
                title={'Xóa'}
                text0={'Chỉ xóa trong ngày hôm nay'}
                text1={'Xóa tất cả các ngày về sau'}
                checked={checkDelete}
                setChecked={setCheckDelete}
                onPressCancel={() => setIsOpenDelete(false)}
                onPressBtn={async () => {
                  if (checkDelete === 0) {
                    await deleteTrip();
                  } else {
                    await deleteManyTrip();
                  }
                  setIsOpenDelete(false);
                  navigation.goBack();
                }}
                colorBtn={'red'}
                textBtn={'Xóa'}
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
    backgroundColor: '#FAFAFA',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  containerDrop: {
    backgroundColor: 'white',
    paddingTop: 20,
    width: '90%',
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
    width: '88%',
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

export default TripDetails;
