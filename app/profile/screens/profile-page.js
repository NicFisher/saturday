import * as auth from '../../auth/actions/auth.action';
import React, {Component} from "react";
import ActionSheet from 'react-native-actionsheet';
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import {connect} from 'react-redux';
import ImagePicker from "react-native-image-picker";
import uuidv4 from "uuid/v4";
import fileExtension from "file-extension";
import * as mime from "react-native-mime-types";
import { baseUrl } from '../../axios/helper';
import axios from "axios";
import {photoUploader} from "../../common/helpers/photo.helper";

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

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  uploadPhoto = () => {
    ImagePicker.launchImageLibrary(photoOptions, response => {
      console.log('Response = ', response);
      if (response.uri == null || response.uri === undefined) return;
      const { uri } = response;
      console.log('URI: ', uri);
      this.setState({avatarSource: {uri: uri}});

      const fileName = `${uuidv4()}.${fileExtension(uri)}`;
      const contentType = mime.lookup(uri) || "application/octet-stream";

      console.log('fileName: ', fileName);
      console.log('contentType: ', contentType);
      const params = {
        params: {
          fileName,
          contentType,
          resourcePath: "users"
        }
      };
      axios
        .post(baseUrl, {
          query: `
          mutation($params: CreateSignedUrlInput) {
            createSignedUrl(params: $params) {
            }
          }`,
          variables: JSON.stringify(params)
        })
        .then(data => {
          const url = data.data.data.createSignedUrl;
          photoUploader(
            url,
            uri,
            fileName,
            contentType,
          );
        })
        .catch(() => {
          // addPhoto({ photo: existingPhoto });
          // errorResponse("Unable to upload image");
        });
        
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
      }
    )
  };

  takePhoto = () => {
    ImagePicker.launchCamera(photoOptions, response => {
      console.log('Response = ', response);
      if (response.uri == null || response.uri === undefined) return;
      const { uri } = response;
      console.log('URI: ', uri);
      this.setState({avatarSource: {uri: uri}});

      const fileName = `${uuidv4()}.${fileExtension(uri)}`;
      const contentType = mime.lookup(uri) || "application/octet-stream";

      console.log('fileName: ', fileName)
      console.log('contentType: ', contentType)



      const params = {
        params: {
          fileName,
          contentType,
          resourcePath: "users"
        }
      };
      axios
        .post(baseUrl, {
          query: `
      mutation ($params: CreateSignedUrlInput!) {
        createSignedUrl(params: $params) {}
      }`,
          variables: JSON.stringify(params)
        })
        .then(data => {
          const url = data.data.data.createSignedUrl;
          photoUploader(
            url,
            uri,
            fileName,
            contentType,
            // existingPhoto,
            // addPhoto,
            // updatePhoto,
            // errorResponse
          );
        })
        .catch(() => {
          addPhoto({ photo: existingPhoto });
          errorResponse("Unable to upload image");
        });

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
    });
  };

  modalOptions = [
    { title: 'Upload Photo', action: this.uploadPhoto },
    { title: 'Take A Photo', action: this.takePhoto },
    { title: 'Cancel' }
  ];

  render() {
    const {avatarSource} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showActionSheet}>
          {avatarSource ? <Image source={avatarSource} style={{height: 120, width: 120, borderRadius: 60, marginBottom: 50}} /> : <View style={{backgroundColor: '#FFA7C4', height: 120, width: 120, borderRadius: 60, marginBottom: 50}} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          options={this.modalOptions.map(option => option.title)}
          cancelButtonIndex={2}
          onPress={index => {
            const action = this.modalOptions[index].action;
            action ? action() : null;
          }}
        />
      </View>
    )
  }
}

const mapDispatchToProps = ({
  logout: auth.logout,
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
