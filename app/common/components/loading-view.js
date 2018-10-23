import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const LoadingView = () => (
  <View style={{flex: 1}}>
    <ActivityIndicator />
  </View>
);

export default LoadingView;