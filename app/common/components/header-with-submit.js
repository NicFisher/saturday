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
          <Icon name='md-close-circle' size={26} style={{color: '#aaa', paddingRight: 5}} />
        </TouchableOpacity>
      </Left>
      <Right>
        <TouchableOpacity transparent onPress={() => onSubmit()} style={{padding: Platform.OS === 'ios' ? 10 : 0}} >
          <Text style={{fontSize: 15}}>Done</Text>
        </TouchableOpacity>
      </Right>
    </Header>
  )
};

export default withNavigation(HeaderWithSubmit);