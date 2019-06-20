import axios from "axios";
import {baseUrl} from "../../axios/helper";
import {
  createActivityQuery,
  deleteActivityQuery,
  fetchActivityQuery,
  updateActivityQuery
} from "../queries/activities.query";
import * as navigation from "../../navigation/actions/navigation.action";
import {mapNodesFromJson} from "../../common/mappers";
import * as activityActions from "../actions/activity.action";

export const createActivity = payload => {
  return dispatch => {
    // dispatch(startLoading());
    axios.post(baseUrl, {
      query: createActivityQuery(),
      variables: JSON.stringify({params: payload}),
    })
      .then(response => {
        const {createActivity} = response.data.data;
        dispatch(activityActions.addEntity(createActivity));
        dispatch(navigation.navigateBackSwitch())
        // dispatch(stopLoading());
      })
      .catch(error => {
        console.log('Error: ', error);
        // dispatch(stopLoading())
      })
  };
};

export const updateActivity = payload => {
  return dispatch => {
    // dispatch(startLoading());
    axios.post(baseUrl, {
      query: updateActivityQuery(),
      variables: JSON.stringify({params: payload}),
    })
      .then(response => {
        const {updateActivity} = response.data.data;
        dispatch(activityActions.addEntity(updateActivity));
        dispatch(navigation.navigateBackSwitch())
        // dispatch(stopLoading());
      })
      .catch(error => {
        console.log('Error: ', error);
        // dispatch(stopLoading())
      })
  };
};

export const deleteActivity = payload => {
  return dispatch => {
    // dispatch(startLoading());
    axios.post(baseUrl, {
      query: deleteActivityQuery(),
      variables: JSON.stringify({id: payload})
    })
      .then(response => {
        const {id} = response.data.data.deleteActivity;
        dispatch(activityActions.removeEntity(id))
      })
      .catch(error => {
        console.log('Error: ', error)
      })
  }
};

export const fetch = () => {
  return dispatch => {
    axios.post(baseUrl, {
      query: fetchActivityQuery()
    })
      .then(response => {
        const {edges} = response.data.data.viewer.activities;
        dispatch(activityActions.addEntities(mapNodesFromJson(edges)));
      })
      .catch(() => {
        console.log('Error')
      })
  }
};
