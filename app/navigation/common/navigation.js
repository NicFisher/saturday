import React from 'react';
import {createStackNavigator} from 'react-navigation';
import ActivitiesPage from "../../activities/screens/activities-page";
import ActivityBuilder from "../../activities/screens/activity-builder";
import Activity from "../../activities/screens/activity";

export const ActivitiesStack = createStackNavigator({
  Activities: {
    screen: ActivitiesPage,
  },
  ActivityBuilder: {
    screen: ActivityBuilder
  },
  Activity: {
    screen: Activity
  }
}, {
  headerMode: 'none',
  mode: 'modal',
});
