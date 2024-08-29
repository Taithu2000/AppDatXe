import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {myColor} from '../../constants/myColor';
import {MyStatusBar} from '../../components/myStatusBar';
import {BarChart} from 'react-native-gifted-charts';
import {
  getAllTicketByDay,
  getAllTicketByMonth,
  getAllTicketBySixMonth,
} from '../../api/ticketApi';
import MyCalendarFull from '../../components/calendar/myCalendarFull';
import dayjs from 'dayjs';
import MonthPicker from 'react-native-month-year-picker';
import MyBarChart from '../../components/chart/myBarChart';
const HomeAdmin = () => {
  const [dateOfMonth, setDateOfMonth] = useState(new Date());
  const [showPickerMonth, setShowPickerMonth] = useState(false);

  const [dateOfDay, setDateOfDay] = useState(new Date());
  const [selectDateOfDay, setSelectDateOfDay] = useState(new Date());
  const [visibleSelectDays, setVisibleSelectDays] = useState(false);

  const [dateOfSixMonths, setDateOfSixMonths] = useState(new Date());
  const [dataChartNow, setDataChartNow] = useState([]);

  const [dataChartLastYear, setDataChartLastYear] = useState([]);

  const [ticket_1Month, setTicket_1Month] = useState([]);
  const [ticket1Day, setTicket1Day] = useState([]);
  const [ticket_6Months, setTicket_6Months] = useState([]);
  const [ticket_6MonthLastYear, setTicket_6MonthLastYear] = useState([]);

  const [mergeDataChart, setMergeDataChart] = useState([]);
  // -------------------------------gọi api lấy dữ liệu-------------------------------

  const getTicketByMonth = async () => {
    try {
      const data = await getAllTicketByMonth(dateOfMonth);
      setTicket_1Month(data);
    } catch (err) {
      console.error('Lỗi lấy dữ liệu: ', err);
      ToastAndroid.show('Không thể lấy dữ liệu');
    }
  };

  useEffect(() => {
    getTicketByMonth();
  }, [dateOfMonth]);

  const getTicketByDay = async () => {
    try {
      const data = await getAllTicketByDay(dateOfDay);
      setTicket1Day(data);
    } catch (err) {
      console.error('Lỗi lấy dữ liệu: ', err);
      ToastAndroid.show('Không thể lấy dữ liệu');
    }
  };

  useEffect(() => {
    getTicketByDay();
  }, [dateOfDay]);

  const getTicketSixMonths = async () => {
    const data = await getAllTicketBySixMonth(dateOfSixMonths);
    setTicket_6Months(data);
  };

  const getTicketSixMonthLastYear = async () => {
    let dateOfSixMonthLastYear = new Date();
    dateOfSixMonthLastYear.setFullYear(new Date().getFullYear() - 1);
    const data = await getAllTicketBySixMonth(dateOfSixMonthLastYear);
    setTicket_6MonthLastYear(data);
  };

  useEffect(() => {
    getTicketSixMonths();
    getTicketSixMonthLastYear();
  }, []);
  // --------------------------tạo mảng data chart cho 6 tháng gần nhất
  const getDataChartNow = () => {
    let initialData = [];
    for (let i = 0; i < 6; i++) {
      let month = new Date().getMonth() - 4 + i;
      if (month <= 0) {
        month += 12;
      }
      if (month > 12) {
        month -= 12;
      }
      if (i == 5) {
        initialData.push({
          value: 0,
          frontColor: 'blue',
          label: month.toString(),
        });
      } else {
        initialData.push({
          value: 0,
          frontColor: 'rgba(0, 0, 255, 0.5)',
          label: month.toString(),
        });
      }
    }

    const dataChart = ticket_6Months.reduce((data, ticket) => {
      const month = new Date(ticket.create_date).getMonth();
      const revenue = (ticket.ticket_price * ticket.seats.length) / 1000000;

      data = data.map(item => {
        if (item.label === month + 1 + '') {
          return {...item, value: item.value + revenue};
        }
        return item;
      });

      return data;
    }, initialData);

    setDataChartNow(dataChart);
  };

  useEffect(() => {
    getDataChartNow();
  }, [ticket_6Months]);

  // --------------------------tạo mảng data chart cho 6 tháng năm ngoái
  const getDataChartLastYear = () => {
    let initialData = [];
    for (let i = 0; i < 6; i++) {
      let month = new Date().getMonth() - 4 + i;
      if (month <= 0) {
        month += 12;
      }
      if (month > 12) {
        month -= 12;
      }
      if (i == 5) {
        initialData.push({
          value: 0,
          label: month.toString(),
          frontColor: '#999999',
        });
      }
      initialData.push({
        value: 0,
        label: month.toString(),
        frontColor: 'rgba(153,153,153,0.5)',
      });
    }

    const dataChart = ticket_6MonthLastYear.reduce((data, ticket) => {
      const month = new Date(ticket.create_date).getMonth();
      const revenue = (ticket.ticket_price * ticket.seats.length) / 1000000;

      data = data.map(item => {
        if (item.label === month + 1 + '') {
          return {
            ...item,
            value: item.value + revenue,
          };
        }
        return item;
      });

      return data;
    }, initialData);

    setDataChartLastYear(dataChart);
  };

  useEffect(() => {
    getDataChartLastYear();
  }, [ticket_6MonthLastYear]);

  //---------------------------Gộp 2 mảng-----------------------------

  useEffect(() => {
    if (dataChartNow.length > 0 && dataChartLastYear.length > 0) {
      let arr = [];
      for (let i = 0; i < 6; i++) {
        arr.push({
          value: dataChartLastYear[i].value,
          frontColor: dataChartLastYear[i].frontColor,
          spacing: 3,
        });
        arr.push(dataChartNow[i]);
      }
      setMergeDataChart(arr);
    }
  }, [dataChartNow, dataChartLastYear]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar />
      <ScrollView>
        <View style={styles.container}>
          {/*------------------- thống kê doanh thu và vé hàng tháng */}
          {showPickerMonth && (
            <MonthPicker
              onChange={(event, newDate) => {
                const selectedDate = newDate || dateOfMonth;
                setShowPickerMonth(false);
                setDateOfMonth(selectedDate);
              }}
              value={dateOfMonth}
              locale="vi"
              okText="Chọn"
            />
          )}

          <View style={styles.monthStatistic}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={{fontSize: 18, color: '#FFFFFF'}}>
                Tháng {dayjs(dateOfMonth).format('MM/YYYY')}
              </Text>
              <TouchableOpacity
                style={styles.btnCalendar}
                onPress={() => {
                  setShowPickerMonth(true);
                }}>
                <Image
                  style={styles.iconImg}
                  source={require('../../assets/images/daily-calendar.png')}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 20, color: '#FFF', marginRight: 20}}>
                Doanh thu:
              </Text>
              <Text style={styles.textTitle}>
                {ticket_1Month
                  .reduce((total, ticket) => {
                    if (ticket.ticket_price && ticket.seats) {
                      return total + ticket.ticket_price * ticket.seats.length;
                    }
                    return total + 0;
                  }, 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                đ
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 20, color: '#FFF', marginRight: 20}}>
                Số vé bán:
              </Text>
              <Text style={styles.textTitle}>{ticket_1Month.length} vé</Text>
            </View>
          </View>

          {/*------------------- thống kê doanh thu và vé hàng ngày */}
          <MyCalendarFull
            visible={visibleSelectDays}
            date={selectDateOfDay}
            onChange={params => {
              setSelectDateOfDay(params.date);
            }}
            onPressbtnLater={() => setVisibleSelectDays(false)}
            onPressbtnSelect={() => {
              setDateOfDay(new Date(selectDateOfDay));
              setVisibleSelectDays(false);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setVisibleSelectDays(true);
            }}
            style={styles.viewSelectDay}>
            <Text style={{fontSize: 20, color: '#000'}}>
              {dayjs(dateOfDay).format('DD/MM/YYYY')}
            </Text>
            <Image
              style={styles.iconArrow}
              source={require('../../assets/images/angle-small-right.png')}
            />
          </TouchableOpacity>
          <View style={styles.containerDatStatistic}>
            <View style={styles.dayStatistic}>
              <Text style={{fontSize: 18, color: '#FFFFFF'}}>Doanh thu</Text>
              <Text style={[styles.textTitle, {marginTop: 10}]}>
                {ticket1Day
                  .reduce((total, ticket) => {
                    if (ticket.ticket_price && ticket.seats) {
                      return total + ticket.ticket_price * ticket.seats.length;
                    }
                    return total + 0;
                  }, 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                đ
              </Text>
            </View>
            <View style={[styles.dayStatistic, {backgroundColor: '#FF33CC'}]}>
              <Text style={{fontSize: 18, color: '#FFFFFF'}}>Vé bán ra</Text>
              <Text style={[styles.textTitle, {marginTop: 10}]}>
                {ticket1Day.length} vé
              </Text>
            </View>
          </View>
          {/*-------------------Biểu đồ */}

          <MyBarChart data={mergeDataChart} />
        </View>
        <View style={{height: 100}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', padding: 15},
  monthStatistic: {
    marginTop: 50,
    width: '100%',
    backgroundColor: myColor.headerColor,
    height: 100,
    borderRadius: 20,
    padding: 10,
  },
  textTitle: {color: '#FFFFFF', fontSize: 20, fontWeight: '700'},
  iconImg: {width: 25, height: 25, tintColor: '#FFFFFF'},
  btnCalendar: {width: 40, height: 25, marginLeft: 10},
  viewSelectDay: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#FFF',
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  containerDatStatistic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  dayStatistic: {
    width: '45%',
    backgroundColor: '#33FFFF',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },

  iconArrow: {
    width: 30,
    height: 30,

    position: 'absolute',
    right: 10,
  },
});
export default HomeAdmin;
