import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export const WelcomePage = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>Saturday</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('RegisterLoginPage', {selectedScreen: 'Login'})}>
          <Text style={{color: '#252C3F'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => props.navigation.navigate('RegisterLoginPage', {selectedScreen: 'Register'})}>
          <Text style={{color: '#fff'}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 40,
    color: '#252C3F',
    width: '80%',
    fontWeight: '800',
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100
  },
  loginButton: {
    width: '80%',
    height: 40,
    borderColor: '#252C3F',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  registerButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#252C3F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});