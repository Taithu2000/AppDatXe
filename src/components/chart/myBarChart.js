import React from 'react';
import {View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

const MyBarChart = ({data}) => {
  return (
    <View style={{width: '100%', marginTop: 20}}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text style={{color: '#000080', fontSize: 18, textAlign: 'center'}}>
          Tổng kết doanh thu 6 tháng gần nhất
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: 'blue',
            }}></View>
          <Text style={{marginHorizontal: 10}}>Hiện tại</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: '#999999',
            }}></View>
          <Text style={{marginHorizontal: 10}}>Cùng kỳ năm trước</Text>
        </View>
      </View>
      <Text />
      <Text>Doanh thu</Text>
      <Text>(Triệu)</Text>
      <BarChart
        barWidth={12}
        noOfSections={5}
        barBorderRadius={4}
        data={data}
        yAxisThickness={0.5}
        xAxisThickness={1}
      />
      <View></View>
    </View>
  );
};

export default MyBarChart;
