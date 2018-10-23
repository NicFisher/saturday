import React from 'react';
import {Header, Left, Right} from 'native-base';
import {Platform, TouchableOpacity, Text} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {withNavigation} from 'react-navigation';

const HeaderWithSubmit = ({navigation, onSubmit}) => {
  return (
    <Header style={{backgroundColor: '#fff', borderBottomColor: '#252C3F'}}>
      <Left>
        <TouchableOpacity transparent onPress={() => navigation.goBack()} style={{padding: Platform.OS === 'ios' ? 10 : 0}}>
          <Icon name='ios-arrow-back' size={26} style={{color: '#252C3F', paddingRight: 5}} />
        </TouchableOpacity>
      </Left>
    </Header>
  )
};

export default withNavigation(HeaderWithSubmit);