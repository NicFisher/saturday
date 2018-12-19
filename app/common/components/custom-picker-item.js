import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const CustomPickerItem = ({item, selectedValue, select}) => {
  const {item: {name}} = item;
  const selected = selectedValue === name;
  return (
    <TouchableOpacity onPress={() => select(name)} style={styles.itemContainer}>
      <Text style={styles.itemText}>{name}</Text>
      {selected && <Icon name="ios-checkmark" style={styles.icon}/>}
    </TouchableOpacity>
  )
};

export default CustomPickerItem;

CustomPickerItem.propTypes = {
  item: PropTypes.object,
  selectedValue: PropTypes.string,
  select: PropTypes.func
};

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 0.5,
    height: 50,
    borderBottomColor: '#c1c1c1',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1
  },
  icon: {
    fontSize: 30
  }
});