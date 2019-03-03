import React from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from "react-native-datepicker";

export const renderInputField = (props) => {
  const {autoCapitalize, multiline, secureTextEntry, placeholder, input: {onChange, onBlur, value}} = props;

  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input}
                 value={value}
                 onChange={onChange}
                 multiline={multiline || false}
                 placeholderTextColor="#aaa"
                 autoCapitalize={autoCapitalize}
                 onBlur={onBlur}
                 secureTextEntry={secureTextEntry}
                 placeholder={placeholder}
      />
    </View>
  )
};

export const renderPickerModal = (props) => {
  const {onPress, input: {value}, placeholder} = props;
  const hasValue = value && value.length;
  const inputValue = hasValue ? value : placeholder;

  return (
    <View>
      <TouchableOpacity style={styles.pickerTouchableOpacity} onPress={onPress}>
        <Text style={[styles.pickerText, {color: (hasValue ? "#252C3F" : '#aaa')}]}>{inputValue}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const renderDatePicker = (props) => {
  const {input: {onChange, value}, placeholder} = props;
  return (
    <DatePicker
      style={styles.datePicker}
      date={value}
      mode="date"
      placeholder={placeholder}
      format="DD-MMM-YYYY"
      maxDate="01-01-2020"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      showIcon={false}
      customStyles={customStyles}
      onDateChange={onChange}
    />
  )
};

const customStyles = {
  dateText: {
    fontSize: 15,
    color: '#252C3F',
    textAlign: 'center'
  },
  placeholderText: {
    fontSize: 15,
    color: '#aaa',
  },
  btnTextConfirm: {
    color: '#252C3F'
  },
  dateInput: {
    height: 40,
    marginTop: 0,
    paddingTop: 0,
    borderWidth: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.5,
  },
  dateTouchBody: {
    height: 40,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginBottom: 15,
  },
  input: {
    marginTop: 10,
    width: '90%',
    minHeight: 26,
    alignItems: 'center',
    fontSize: 15,
    color: '#252C3F',
  },
  pickerTouchableOpacity: {
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: "#aaa",
    marginBottom: 10,
    marginTop: 10
  },
  pickerText: {
    fontSize: 15,
    marginBottom: 10
  },
  datePicker: {
    width: '100%',
    marginBottom: 10
  }
});