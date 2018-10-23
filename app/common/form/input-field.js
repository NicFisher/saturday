import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

export const renderInputField = (props) => {
  const {autoCapitalize, secureTextEntry, placeholder, input: {onChange, onBlur}, meta: {error, touched}} = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input}
                 onChange={onChange}
                 autoCapitalize={autoCapitalize}
                 onBlur={onBlur}
                 secureTextEntry={secureTextEntry}
                 placeholder={placeholder}
      />
      {touched && error && <Text style={{fontSize: 18, color: '#252C3F'}}>*</Text>}
    </View>
  )
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