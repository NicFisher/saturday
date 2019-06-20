import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";

class CalendarPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Calender</Text>
        <Text style={styles.subtitle}>Coming soon...</Text>
      </View>
    )
  }
}

export default CalendarPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 80,
  },
  headerText: {
    fontSize: 36,
    color: '#252C3F',
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 20,
    color: '#252C3F'
  }
});