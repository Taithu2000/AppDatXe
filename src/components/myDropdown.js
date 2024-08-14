import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {exp} from 'react-native-reanimated';

const MyDropdown = ({
  isFocus,
  textLable,
  data,
  labelField,
  valueField,
  placeholder,
  value,
  onFocus,
  onBlur,
  onChange,
}) => {
  // --------------------------------tạo label cho dropdown----------------------------------------

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>{textLable}</Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.containerDrop}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerDrop: {
    backgroundColor: 'white',
    paddingTop: 20,
    width: '90%',
  },
  dropdown: {
    height: 50,
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
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 20,
    color: '#AAAAAA',
  },
  selectedTextStyle: {
    fontSize: 20,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    elevation: 10,
    backgroundColor: 'white',
  },
  viewText: {
    width: '90%',
    paddingTop: 20,
  },
});

export default MyDropdown;
