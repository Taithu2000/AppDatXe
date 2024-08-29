import React, {Component, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import HeaderTripList from '../../components/header/headerTripList';
import {useSelector, useDispatch} from 'react-redux';
import {getAllTicketByRouteInDay} from '../../api/ticketApi';
import {fetchUsersDataSSS} from '../../redux/actions/userAction';
import SkeletonTicket from '../../components/skeleton/skeletonItemTicket';
import NoDataComponent from '../../components/noDataComponent';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');

const TicketList = ({navigation}) => {
  const {route} = useSelector(state => state.route);
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs().startOf('day'));

  const [tickets, setTickets] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  //sắp xếp
  const sortTicket = tickets => {
    return tickets.sort((t1, t2) => {
      const pickupTimeT1 =
        parseInt(t1.pickupTime.split(':')[0]) * 60 +
        parseInt(t1.pickupTime.split(':')[1]);

      const pickupTimeT2 =
        parseInt(t2.pickupTime.split(':')[0]) * 60 +
        parseInt(t2.pickupTime.split(':')[1]);

      return pickupTimeT1 - pickupTimeT2;
    });
  };
  //-------------------gọi api lấy dữ liệu//-------------------
  const getDataTicket = async () => {
    setIsLoading(true);
    try {
      const data = await getAllTicketByRouteInDay(route._id, date);
      setTickets(sortTicket(data));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const getAllUser = async () => {
    await dispatch(fetchUsersDataSSS());
  };

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    getDataTicket();
  }, [date]);

  const ItemTicket = ({item}) => {
    const user = users.find(user => user._id === item.user_id);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TicketDetails', {ticket: item, route, user});
        }}
        style={styles.itemContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '48%', paddingRight: 5}}>
            <Text style={styles.text}>{item.customer.name}</Text>
            <Text style={{fontSize: 16, marginTop: 5}}>Đón lúc</Text>
            <Text style={{fontSize: 20, color: '#000000', fontWeight: '700'}}>
              {item.pickupTime}
            </Text>
            <Text style={{fontSize: 16, marginTop: 5}}>Đón</Text>
            <Text style={styles.text}> {item.pickup}</Text>
          </View>
          <View
            style={{
              height: '100%',
              width: 1,
              backgroundColor: '#CCCCCC',
            }}></View>
          <View style={{width: '50%', paddingLeft: 10}}>
            <Text style={{fontSize: 20, color: '#000000', fontWeight: '700'}}>
              {item.customer.phone}
            </Text>
            <Text style={{fontSize: 16, marginTop: 5}}>Ghế</Text>
            <Text style={styles.text}>
              {item.seats
                .map(seat => {
                  return seat.name;
                })
                .join(', ')}
            </Text>
            <Text style={{fontSize: 16, marginTop: 5}}>Trả</Text>
            <Text style={styles.text}> {item.drop_off}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.tripContainer}>
      <HeaderTripList date={date} setDate={setDate} />

      <View style={styles.flatListContainer}>
        {isLoading && <SkeletonTicket />}
        {!isLoading && (
          <FlatList
            data={tickets}
            renderItem={({item}) => <ItemTicket item={item} />}
            keyExtractor={item => item._id}
            ListFooterComponent={<View style={{height: 40}} />}
          />
        )}
        {!isLoading && tickets.length == 0 && (
          <NoDataComponent
            source={require('../../assets/images/bus-ticket.png')}
            content={'Không có khách hàng đặt vé'}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: '95%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFEE',
    elevation: 5,
    marginTop: 15,
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    color: '#000000',
  },
  //----------------------------------------------------------------
  tripContainer: {
    flex: 1,
  },

  flatListContainer: {
    flex: 1,
    backgroundColor: '#cbd5d6',
  },

  imageData: {
    width: 60,
    height: 60,
    margin: 10,
    alignSelf: 'center',
    tintColor: '#2fd6c3',
  },
});

export default TicketList;
