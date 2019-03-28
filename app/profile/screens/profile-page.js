import * as auth from '../../auth/actions/auth.action';
import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import {connect} from 'react-redux';
import ImagePicker from "react-native-image-picker";
import uuidv4 from "uuid/v4";
import fileExtension from "file-extension";
import * as mime from "react-native-mime-types";

const photoOptions = {
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null
    };
  }
  uploadPhoto = () => {
    ImagePicker.launchImageLibrary(photoOptions, response => {
      console.log('Response = ', response);
      if (response.uri == null || response.uri === undefined) return;
      const { uri } = response;
      console.log('URI: ', uri);
      this.setState({avatarSource: {uri: uri}});

      const fileName = `${uuidv4()}.${fileExtension(uri)}`;
      const contentType = mime.lookup(uri) || "application/octet-stream";

      console.log('fileName: ', fileName)
      console.log('contentType: ', contentType)


        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
      }
    )
  };

  render() {
    const {avatarSource} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.uploadPhoto}>
          {!!avatarSource ? <Image source={avatarSource} style={{height: 120, width: 120, borderRadius: 60, marginBottom: 50}} /> : <View style={{backgroundColor: '#FFA7C4', height: 120, width: 120, borderRadius: 60, marginBottom: 50}} />}
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 80,
    alignItems: 'center'
  },
});
