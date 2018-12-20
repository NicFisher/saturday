import * as auth from '../../auth/actions/auth.action';
import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {connect} from 'react-redux';

class ProfilePage extends Component {
  render() {
    return (
      <View style={{marginTop: 50}}>
        <Text style={{fontSize: 30}}>Profile</Text>
        <TouchableOpacity onPress={() => this.props.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = ({
  logout: auth.logout
});

export default connect(null, mapDispatchToProps)(ProfilePage);
