import React from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';

export const renderInputField = (props) => {
  const {autoCapitalize, secureTextEntry, placeholder, input: {onChange, onBlur}, meta: {error, touched}} = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input}
                 onChange={onChange}
                 placeholderTextColor="#aaa"
                 autoCapitalize={autoCapitalize}
                 onBlur={onBlur}
                 secureTextEntry={secureTextEntry}
                 placeholder={placeholder}
      />
      {touched && error && <Text style={{fontSize: 18, color: '#252C3F'}}>*</Text>}
    </View>
  )
};

export const renderPickerModal = (props) => {
  const {onPress, input: {value}, placeholder} = props;
  const hasValue = value && value.length;
  const inputValue = hasValue ? value : placeholder;

  return (
    <View>
      <TouchableOpacity style={{justifyContent: 'center', borderBottomWidth: 0.5, borderBottomColor: "#000", marginBottom: 10}} onPress={onPress}>
        <Text style={{fontSize: 15, marginBottom: 10, color: (hasValue ? "#000" : '#aaa')}}>{inputValue}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#252C3F',
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginBottom: 15,
  },
  input: {
    width: '90%',
    height: 26,
    alignItems: 'center',
    fontSize: 15,
    color: '#252C3F',
  }
});