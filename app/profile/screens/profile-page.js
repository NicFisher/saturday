import * as auth from '../../auth/actions/auth.action';
import * as user from '../../user/reducers/user.reducer';
import * as userThunk from '../../user/thunks/user.thunk';
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
import {createSignedUrl} from "../../user/queries/user.queries";

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
      if (response.uri == null || response.uri === undefined) return;
      const { uri } = response;
      const fileName = `${uuidv4()}.${fileExtension(uri)}`;
      const contentType = mime.lookup(uri) || "application/octet-stream";
      const params = {
        params: {
          fileName,
          contentType,
          resourcePath: "users"
        }
      };
      axios
        .post(baseUrl, {
          query: createSignedUrl(),
          variables: JSON.stringify(params)
        })
        .then(data => {
          const url = data.data.data.createSignedUrl;
          photoUploader(
            url,
            uri,
            fileName,
            contentType,
            this.props.updatePhoto,
          );
        })
        .catch(() => {
          // add error message
        });
      }
    )
  };

  modalOptions = [
    { title: 'Upload Photo', action: this.uploadPhoto },
    { title: 'Cancel' }
  ];

  render() {
    const {user: {photo}} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showActionSheet}>
          {photo ? <Image source={{uri: photo}} style={styles.avatar} /> : <View style={styles.defaultAvatar} />}
        </TouchableOpacity>
        <Text style={styles.uploadText}>Upload Image</Text>
        <TouchableOpacity onPress={() => this.props.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          options={this.modalOptions.map(option => option.title)}
          cancelButtonIndex={1}
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
  updatePhoto: userThunk.updatePhoto
});

const mapStateToProps = state => ({
  user: user.getUserDetails(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: 80,
    alignItems: 'center',
  },
  uploadText: {
    marginBottom: 60
  },
  avatar: {
    height: 120,
    width: 120,
    marginBottom: 10,
    borderRadius: 60
  },
  defaultAvatar: {
    backgroundColor: '#252C3F',
    height: 120,
    width: 120,
    marginBottom: 10,
    borderRadius: 60
  },
});
