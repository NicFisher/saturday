import * as fromActivities from '../reducers/activity.reducer';
import * as fromUser from '../../user/reducers/user.reducer';
import * as activityActions from '../actions/activity.action';
import React, {Component} from "react";
import {connect} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import ActivitiesList from "../components/activities-list";
import Icon from "react-native-vector-icons/Ionicons";
import uuidv4 from 'uuid/v4';
import {Map} from 'immutable';

const activitiesData = [
  {
    id: uuidv4(),
    type: 'run',
    createdAt: '09-09-18',
    scheduledDate: 'Tuesday 9th September',
    duration: '12 km',
    status: 'active',
    title: 'Steady run',
    notes: 'Heart rate 150bpm',
    data: {
      additionalNotes: 'Heart rate 150bpm'
    }
  },
  {
    id: uuidv4(),
    type: 'stretch',
    createdAt: '09-09-18',
    scheduledDate: 'Wednesday 10th September',
    duration: '20 minutes',
    status: 'active',
    title: 'Lower Body Stretching',
    data: {
      additionalNotes: 'Lower body stretching'
    }
  },
  {
    id: uuidv4(),
    type: 'gym',
    createdAt: '09-09-18',
    scheduledDate: 'Thursday 11th September',
    duration: '20 minutes',
    status: 'active',
    title: 'Chest and tris',
    data: {
      additionalNotes: 'Bench press'
    }
  },
  {
    id: uuidv4(),
    type: 'run',
    createdAt: '09-09-18',
    scheduledDate: 'Friday 13th September',
    duration: '12 km',
    status: 'active',
    title: 'Easy run',
    data: {
      additionalNotes: 'Heart rate 150bpm'
    }
  },
];

const activitiesMap = activitiesData.reduce(
  (activities, activity) => {
    return activities.set(activity.id, activity);
  }, Map()
);

class ActivitiesPage extends Component {
  componentDidMount() {
    this.props.addActivities(activitiesMap);
  }
  render() {
    const {userDetails: {firstName}} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.headerText}>Hello {firstName}.</Text>
          <TouchableOpacity style={styles.addActivityButton} onPress={() => this.props.navigation.navigate('ActivityBuilder')}>
            <Icon size={36} name="ios-add" style={{color: '#fff'}}></Icon>
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeaderText}>Here are your activities</Text>
        <ActivitiesList activities={this.props.activities}
                        removeActivity={this.props.removeActivity}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  activities: fromActivities.getEntitiesArray(state),
  userDetails: fromUser.getUserDetails(state)
});

const mapDispatchToProps = {
  addActivities: activityActions.addEntities,
  removeActivity: activityActions.removeEntity
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 36,
    color: '#252C3F',
    fontWeight: '900',
  },
  subHeaderText: {
    fontSize: 20,
    color: '#252C3F',
    fontWeight: '900',
    marginBottom: 50,
  },
  addActivityButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#252C3F'
  }
});
