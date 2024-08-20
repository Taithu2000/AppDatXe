import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DialogNotify from '../dialog/dialogNotify';

const SeatSelection40 = ({seat,selectSeat,setSelectSeat}) => {
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
      <DialogNotify visible={visibleModal} setVisible={setVisibleModal} />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.header}>Tầng 1</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            {Array(5)
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

                    <View style={styles.seatBottom}></View>
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={{flexDirection: 'column', marginHorizontal: 35}}>
            {Array(5)
              .fill()
              .map((_, i) => {
                const number = i + 6;
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

                    <View style={styles.seatBottom}></View>
                  </TouchableOpacity>
                );
              })}
          </View>

          <View style={{flexDirection: 'column'}}>
            {Array(5)
              .fill()
              .map((_, i) => {
                const number = i + 11;
                let name = `C${i * 2 + 1}`;
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

                    <View style={styles.seatBottom}></View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>

        <View style={{flexDirection: 'row', marginHorizontal: 5}}>
          {Array(5)
            .fill()
            .map((_, i) => {
              const number = i + 31;
              let name = `D${i * 2 + 1}`;
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

                  <View style={styles.seatBottom}></View>
                </TouchableOpacity>
              );
            })}
        </View>

        <View style={{height: 20}}></View>
      </View>

      <View
        style={{width: 2, height: '100%', backgroundColor: '#FFFFFF'}}></View>

      {/* ----------------------------------Tầng 2---------------------------------- */}
      <View style={{alignItems: 'center'}}>
        <Text style={styles.header}>Tầng 2</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            {Array(5)
              .fill()
              .map((_, i) => {
                const number = i + 16;
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

                    <View style={styles.seatBottom}></View>
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={{flexDirection: 'column', marginHorizontal: 35}}>
            {Array(5)
              .fill()
              .map((_, i) => {
                const number = i + 21;
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

                    <View style={styles.seatBottom}></View>
                  </TouchableOpacity>
                );
              })}
          </View>

          <View style={{flexDirection: 'column'}}>
            {Array(5)
              .fill()
              .map((_, i) => {
                const number = i + 26;
                let name = `C${i * 2 + 2}`;

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

                    <View style={styles.seatBottom}></View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 5}}>
          {Array(5)
            .fill()
            .map((_, i) => {
              const number = i + 36;
              let name = `D${i * 2 + 2}`;
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

                  <View style={styles.seatBottom}></View>
                </TouchableOpacity>
              );
            })}
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
    width: 35,
    height: 60,
    borderWidth: 1,
    marginTop: 15,
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

  //   seatLeft: {
  //     width: 15,
  //     height: 50,
  //     position: 'absolute',
  //     left: -7,
  //     borderRadius: 10,
  //     backgroundColor: '#F4A460',
  //   },

  //   seatRight: {
  //     width: 15,
  //     height: 50,
  //     position: 'absolute',
  //     right: -7,
  //     borderRadius: 10,
  //     backgroundColor: '#F4A460',
  //   },

  seatBottom: {
    width: 30,
    height: 10,
    position: 'absolute',
    bottom: 5,
    borderRadius: 10,
    backgroundColor: '#F4A460',
  },
});

export default SeatSelection40;
