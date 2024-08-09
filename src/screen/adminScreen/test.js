import React, {useState} from 'react';
import WheelPicker from 'react-native-wheely';
import DateTimePicker from 'react-native-ui-datepicker';
import {View} from 'react-native';
import dayjs from 'dayjs';
const TestScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState();
  data = ['nhat', 'My', 'han', 'trung', 'ai cap', 'viet nam', 'nhat'];
  console.log(data[selectedIndex]);
  console.log(date);

  return (
    <View>
      <WheelPicker
        selectedIndex={selectedIndex}
        itemStyle
        itemTextStyle={{color: 'black', fontSize: 20}}
        containerStyle={{borderTopWidth: 1, width: 100, fontsize: 20}}
        selectedIndicatorStyle={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          width: 100,
          fontsize: 20,
        }}
        visibleRest={1}
        options={data}
        onChange={index => setSelectedIndex(index)}
      />

      <DateTimePicker
        mode="single"
        date={date}
        onChange={params => setDate(params.date)}
      />
    </View>
  );
};
export default TestScreen;
