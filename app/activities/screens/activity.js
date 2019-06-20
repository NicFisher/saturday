import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as fromActivities from '../selectors/activity.selector';
import CommonHeader from "../../common/components/common-header";
import {Field, isDirty, reduxForm} from "redux-form";
import {renderDatePicker, renderInputField, renderPickerModal} from "../../common/form/input-field";
import {connect} from 'react-redux';
import {titleCase} from "../../common/helpers/formatting.helper";
import Modal from "react-native-modal";
import ActivityKindModal from "../components/activity-kind-modal";

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
  }

  render() {
    const {navigation, isDirty} = this.props;
    return(
      <View style={styles.container}>
        <CommonHeader navigation={navigation} withSubmit={isDirty} submitText='Update'/>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Activity</Text>
            <Field
              name="title"
              autoCapitalize="sentences"
              component={renderInputField}
              placeholder="Title"
            />
            <Field
              name="kind"
              autoCapitalize="sentences"
              component={renderPickerModal}
              placeholder="Kind"
              format={(value) => titleCase(value)}
              onPress={() => this.setState({isVisible: true})}
            />
            <Field
              name="scheduledDate"
              autoCapitalize="sentences"
              component={renderDatePicker}
              placeholder="Scheduled Date"
            />
            <Field
              name="duration"
              autoCapitalize="sentences"
              component={renderInputField}
              placeholder="Duration"
            />
            <Field
              name="description"
              autoCapitalize="sentences"
              component={renderInputField}
              placeholder="Description"
            />
            <Modal onBackdropPress={() => this.setState({isVisible: false})}
                   isVisible={this.state.isVisible} style={styles.modal}>
              <ActivityKindModal activityKinds={activityKinds}
                                 selectActivity={this._selectActivityKind}
                                 closeModal={() => this.setState({isVisible: false})}
                                 selectedValue={activityKind}
              />
            </Modal>
          </View>
      </View>
    )
  }
}

Activity = reduxForm({
  form: 'activity',
  enableReinitialize: true,
})(Activity);

const mapStateToProps = state => ({
  initialValues: fromActivities.getFormValues(state),
  isDirty: isDirty('activity')(state),
});

export default connect(mapStateToProps)(Activity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20
  },
  formContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  modal: {
    margin: 0,
    justifyContent: "flex-end"
  },
  headerText: {
    color: '#252C3F',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 30
  }
});