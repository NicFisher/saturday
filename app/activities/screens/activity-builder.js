import * as activity from '../actions/activity.action'
import * as fromNavigation from '../../navigation/reducers/navigation.reducer';
import * as navigation from '../../navigation/actions/navigation.action';
import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native';
import CommonHeader from '../../common/components/common-header';
import {change, Field, getFormValues, reduxForm, submit} from "redux-form";
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {renderDatePicker, renderInputField, renderPickerModal} from "../../common/form/input-field";
import ActivityKindModal from "../components/activity-kind-modal";
import {withNavigation} from "react-navigation";
import * as fromActivities from "../selectors/activity.selector";
import {titleCase} from "../../common/helpers/formatting.helper";

const activityKinds = [
  {id: '1', name: 'Run'},
  {id: '2', name: 'Gym'},
  {id: '3', name: 'Stretch'},
];

class ActivityBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
  }

  componentDidUpdate(prevProps) {
    const {navigateBack, navigation, navigationBackSwitch} = this.props;
    if(navigateBack && prevProps.navigateBack !== navigateBack) {
      navigation.goBack();
      navigationBackSwitch();
    }
  }

  componentWillUnmount() {
    this.props.removeSelected()
  }

  _selectActivityKind = value => {
    const {changeForm} = this.props;
    changeForm('activity', 'kind', value);
    this.setState({isVisible: false})
  };

  _submitHandler = () => {
    const {createActivity, activitiesFormValues, initialValues: {id}} = this.props;
    return id ? updateActivity(activitiesFormValues) : createActivity(activitiesFormValues);
  };

  render() {
    const {activitiesFormValues, initialValues} = this.props;
    const activityKind = activitiesFormValues ? activitiesFormValues.kind : null;

    return (
      <View style={styles.container}>
        <CommonHeader onSubmit={() => this._submitHandler()} withSubmit={true}/>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>{initialValues ? 'Edit Activity' : 'Add Activity'}</Text>
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
            name="duration"
            autoCapitalize="sentences"
            component={renderInputField}
            placeholder="Duration"
          />
          <Field
            name="scheduledDate"
            autoCapitalize="sentences"
            component={renderDatePicker}
            placeholder="Scheduled Date"
          />
          <Field
            name="description"
            autoCapitalize="sentences"
            multiline={true}
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

const mapStateToProps = state => ({
  initialValues: fromActivities.getSelectedEntity(state),
  activitiesFormValues: getFormValues('activity')(state),
  navigateBack: fromNavigation.getNavigateBack(state)
});

const mapDispatchToProps = {
  createActivity: activity.createActivity,
  removeSelected: activity.removeSelected,
  updateActivity: activity.updateActivity,
  submitForm: submit,
  changeForm: change,
  navigationBackSwitch: navigation.navigateBackSwitch
};

const connectedActivityBuilder = connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'activity', enableReinitialize: true})(ActivityBuilder));
export default withNavigation(connectedActivityBuilder);

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
