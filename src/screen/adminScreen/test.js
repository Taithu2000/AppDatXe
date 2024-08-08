import React, {useState} from 'react';
import WheelPicker from 'react-native-wheely';

const TestScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  data = ['nhat', 'My', 'han', 'trung', 'ai cap', 'viet nam', 'nhat'];
  console.log(data[selectedIndex]);
  return (
    <WheelPicker
      selectedIndex={selectedIndex}
      itemStyle
      itemTextStyle={{color: 'black', fontSize: 20}}
      containerStyle={{borderTopWidth: 1, width: 100, fontsize: 20}}
      selectedIndicatorStyle={{borderTopWidth: 1,borderBottomWidth: 1, width: 100, fontsize: 20}}
      visibleRest={1}
      options={data}
      onChange={index => setSelectedIndex(index)}
    />
  );
};
export default TestScreen;
