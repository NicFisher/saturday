import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import _ from 'lodash';
import moment from 'moment'

const capitalize = (value) =>  _.capitalize(value);

class ActivitiesList extends Component {

  renderItem = ({item}) => (
    <TouchableOpacity style={styles.activityCard}>
      <View style={styles.row}>
        <Text style={styles.cardDate}>{moment(item.scheduledDate).format("dddd Do MMM")}</Text>
        <TouchableOpacity style={styles.closeIcon} onPress={() => this.props.removeActivity(item.id)}>
          <Icon size={28} name="ios-close" style={{color: '#252C3F'}} />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardType}>{capitalize(item.kind)}</Text>
      <Text style={styles.cardInfo}>{item.title}</Text>
      <Text style={styles.cardInfo}>{item.duration}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <FlatList data={this.props.activities}
                keyExtractor={item => item.id}
                renderItem={this.renderItem}
      />
    )
  }
}

export default ActivitiesList;

const styles = StyleSheet.create({
  activityCard: {
    backgroundColor: '#fff',
    borderColor: '#252C3F',
    borderWidth: 1,
    height: 120,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingTop: 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  cardDate: {
    letterSpacing: 1,
    color: '#252C3F'
  },
  cardType: {
    fontSize: 20,
    color: '#252C3F',
    fontWeight: '900',
    marginBottom: 5,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 25,
  },
  cardInfo: {
    letterSpacing: 1,
    color: '#252C3F',
  },
  closeIcon: {
    paddingRight: 10,
    paddingLeft: 10,
  }
});