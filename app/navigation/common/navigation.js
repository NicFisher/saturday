import React from 'react';
import {createStackNavigator} from 'react-navigation';
import ActivitiesPage from "../../activities/screens/activities-page";
import ActivityBuilder from "../../activities/components/activity-builder";

export const ActivitiesStack = createStackNavigator({
  Activities: {
    screen: ActivitiesPage,
  },
  ActivityBuilder: {
    screen: ActivityBuilder
  }
}, {
  headerMode: 'none',
  mode: 'modal',
});