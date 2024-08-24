import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {myColor} from '../../constants/myColor';
import DialogNotify from '../../components/dialog/dialogNotify';

const SeatSelection22 = ({seat, selectSeat, setSelectSeat}) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const checkSeat = seat => {
    const isSelected = selectSeat.some(selectSeat => {
      return selectSeat.key === seat.key;
    });

    return isSelected;
  };

  const checkSeatSold = number => {
    if (seat.bus_seats[number - 1]) {
      return seat?.bus_seats[number - 1].status;
    } else {
      return true;
    }
  };
  ////------------------------------------ hoặc bỏ chọn ghế//------------------------------------
  const toggleSeat = seat => {
    if (selectSeat.length >= 5) {
      if (checkSeat(seat)) {
        setSelectSeat(selectSeat.filter(a => a.key !== seat.key));
      } else {
        setVisibleModal(true);
      }
    } else {
      if (checkSeat(seat)) {
        setSelectSeat(selectSeat.filter(a => a.key !== seat.key));
      } else {
        setSelectSeat([...selectSeat, seat]);
      }
    }
  };
  return (
    <View style={styles.container}>
      {/*----------------- hộp thoại thông báo {/*-----------------*/}
      <DialogNotify
        visible={visibleModal}
        source={require('../../assets/images/siren.png')}
        title={'Lỗi'}
        content={'Só lượng ghế bạn chọn đã vượt quá số lượng cho phép'}
        onPress={() => {
          setVisibleModal(false);
        }}
      />

      <View>
        <Text style={styles.header}>Tầng 1</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            {Array(6)
              .fill()
              .map((_, i) => {
                const number = i + 1;
                let name = `A${i * 2 + 1}`;

                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    disabled={checkSeatSold(number) ? true : false}
                    key={number}
                    onPress={() => toggleSeat({key: number, name: name})}
                    style={[
                      styles.seat,
                      {
                        backgroundColor: checkSeatSold(number)
                          ? '#CCCCCC'
                          : checkSeat({key: number, name: name})
                          ? 'green'
                          : '#FFFFFF',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textSeat,
                        {
                          color: checkSeat({key: number, name: name})
                            ? '#FFFFFF'
                            : '#000000',
                        },
                      ]}>
                      {name}
                    </Text>
                    <View style={styles.seatLeft}></View>
                    <View style={styles.seatRight}></View>
                    <View style={styles.seatBottom}></View>
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={{flexDirection: 'column'}}>
            {Array(5)
              .fill()
              .map((_, i) => {
                const number = i + 7;
                let name = `B${i * 2 + 1}`;
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    disabled={checkSeatSold(number) ? true : false}
                    key={number}
                    onPress={() => toggleSeat({key: number, name: name})}
                    style={[
                      styles.seat,
                      {
                        backgroundColor: checkSeatSold(number)
                          ? '#CCCCCC'
                          : checkSeat({key: number, name: name})
                          ? 'green'
                          : '#FFFFFF',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textSeat,
                        {
                          color: checkSeat({key: number, name: name})
                            ? '#FFFFFF'
                            : '#000000',
                        },
                      ]}>
                      {name}
                    </Text>

                    <View style={styles.seatLeft}></View>
                    <View style={styles.seatRight}></View>
                    <View style={styles.seatBottom}></View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
        <View style={{height: 20}}></View>
      </View>

      <View
        style={{width: 2, height: '100%', backgroundColor: '#FFFFFF'}}></View>

      {/* ----------------------------------Tầng 2---------------------------------- */}
      <View>
        <Text style={styles.header}>Tầng 2</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            {Array(6)
              .fill()
              .map((_, i) => {
                const number = i + 12;
                let name = `A${i * 2 + 2}`;

                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    disabled={checkSeatSold(number) ? true : false}
                    key={number}
                    onPress={() => toggleSeat({key: number, name: name})}
                    style={[
                      styles.seat,
                      {
                        backgroundColor: checkSeatSold(number)
                          ? '#CCCCCC'
                          : checkSeat({key: number, name: name})
                          ? 'green'
                          : '#FFFFFF',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textSeat,
                        {
                          color: checkSeat({key: number, name: name})
                            ? '#FFFFFF'
                            : '#000000',
                        },
                      ]}>
                      {name}
                    </Text>
                    <View style={styles.seatLeft}></View>
                    <View style={styles.seatRight}></View>
                    <View style={styles.seatBottom}></View>
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={{flexDirection: 'column'}}>
            {Array(5)
              .fill()
              .map((_, i) => {
                const number = i + 18;
                let name = `B${i * 2 + 2}`;

                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    disabled={checkSeatSold(number) ? true : false}
                    key={number}
                    onPress={() => toggleSeat({key: number, name: name})}
                    style={[
                      styles.seat,
                      {
                        backgroundColor: checkSeatSold(number)
                          ? '#CCCCCC'
                          : checkSeat({key: number, name: name})
                          ? 'green'
                          : '#FFFFFF',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textSeat,
                        {
                          color: checkSeat({key: number, name: name})
                            ? '#FFFFFF'
                            : '#000000',
                        },
                      ]}>
                      {name}
                    </Text>
                    <View style={styles.seatLeft}></View>
                    <View style={styles.seatRight}></View>
                    <View style={styles.seatBottom}></View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </View>
    </View>
  );
};

{
  /*-------------------------------------- Style--------------------------------- */
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  header: {
    alignSelf: 'center',
    marginVertical: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },

  seat: {
    width: 60,
    height: 80,
    borderWidth: 1,
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCC',
  },
  textSeat: {
    fontSize: 16,
    fontWeight: '700',
  },

  seatLeft: {
    width: 15,
    height: 50,
    position: 'absolute',
    left: -7,
    borderRadius: 10,
    backgroundColor: '#F4A460',
  },

  seatRight: {
    width: 15,
    height: 50,
    position: 'absolute',
    right: -7,
    borderRadius: 10,
    backgroundColor: '#F4A460',
  },

  seatBottom: {
    width: 50,
    height: 15,
    position: 'absolute',
    bottom: -7,
    borderRadius: 10,
    backgroundColor: '#F4A460',
  },
});

export default SeatSelection22;
