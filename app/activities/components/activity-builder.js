import * as Animatable from 'react-native-animatable';
import React, {Component} from 'react'
import {View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import HeaderWithSubmit from '../../common/components/header-with-submit';
import {Field, reduxForm, submit, getFormValues} from "redux-form";
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import Icon from "react-native-vector-icons/Ionicons";
import CustomPickerItem from "../../common/components/custom-picker-item";
import {renderInputField} from "../../common/form/input-field";

const activityTypes = [
  {id: '1', name: 'run'},
  {id: '2', name: 'gym'},
  {id: '3', name: 'stretch'},
];

class ActivityBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
  }

  submitHandler = () => {
    console.log('Form Values: ', this.props.activitiesFormValues);
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderWithSubmit onSubmit={() => this.submitHandler()}/>
        <View style={styles.formContainer}>
          <Text style={{color: '#252C3F', fontSize: 34, fontWeight: '800', marginBottom: 30}}>Add Activity</Text>
          <Field
            name="title"
            autoCapitalize="sentences"
            component={renderInputField}
            placeholder="Title"
          />
          <Field
            name="type"
            autoCapitalize="sentences"
            component={renderInputField}
            placeholder="Type"
          />
          <Field
            name="duration"
            autoCapitalize="sentences"
            component={renderInputField}
            placeholder="Duration"
          />
          <Field
            name="scheduledDate"
            autoCapitalize="sentences"
            component={renderInputField}
            placeholder="Scheduled Date"
          />
          <Field
            name="additionalInformation"
            autoCapitalize="sentences"
            component={renderInputField}
            placeholder="Additional Information"
          />
          <Modal onBackdropPress={() => this.setState({isVisible: false})}
                 isVisible={this.state.isVisible} style={styles.modal}>
            <Animatable.View transition="height" style={styles.animatedView}>
              <TouchableOpacity style={styles.closeIconContainer} onPress={() => this.setState({isVisible: false})}>
                <Icon name="md-close-circle" style={styles.closeIcon} />
              </TouchableOpacity>
              <View style={styles.content}>
                <FlatList data={activityTypes}
                          keyExtractor={item => item.id}
                          renderItem={(item) => <CustomPickerItem item={item} />}
                />
              </View>
            </Animatable.View>
          </Modal>

        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  activitiesFormValues: getFormValues('activity')(state),
});

const mapDispatchToProps = {
  submitForm: submit,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'activity'})(ActivityBuilder));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  formContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  animatedView: {
    height: 200,
    width: '100%',
    margin: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 15
  },
  modal: {
    margin: 0,
    justifyContent: "flex-end"
  },
  content: {
    marginBottom: 15
  },
  closeIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    color: '#909090',
    paddingLeft: 10,
    fontSize: 28
  }
});
