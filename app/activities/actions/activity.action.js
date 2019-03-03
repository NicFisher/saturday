import * as navigation from "../../navigation/actions/navigation.action";
import axios from "axios";
import {baseUrl} from "../../axios/helper";
import {createActivityQuery, deleteActivityQuery, fetchActivityQuery} from "../queries/activities.query";
import {mapNodesFromJson} from "../../common/mappers";

export const ADD_ENTITY = "[ACTIVITY] Add Entity";
export const ADD_ENTITIES = "[ACTIVITY] Add Entities";
export const DELETE_ENTITY = "[ACTIVITY] Delete Entity";
export const REMOVE_ENTITY = "[ACTIVITY] Remove Entity";
export const SELECT = "[ACTIVITY] Select Entity";
export const REMOVE_SELECTED = "[ACTIVITY] Remove Selected Entity";

// Actions

export const addEntity = payload => ({
  type: ADD_ENTITY,
  payload
});

export const addEntities = payload => ({
  type: ADD_ENTITIES,
  payload
});

export const removeEntity = payload => ({
  type: REMOVE_ENTITY,
  payload
});

export const select = payload => ({
  type: SELECT,
  payload,
});

export const removeSelected = () => ({
  type: REMOVE_SELECTED,
});

// Epics - equivalent

export const createActivity = payload => {
  return dispatch => {
    // dispatch(startLoading());
    axios.post(baseUrl, {
      query: createActivityQuery(),
      variables: JSON.stringify({params: payload}),
    })
      .then(response => {
        const {createActivity} = response.data.data;
        dispatch(addEntity(createActivity));
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
      query: createActivityQuery(),
      variables: JSON.stringify({params: payload}),
    })
      .then(response => {
        const {createActivity} = response.data.data;
        dispatch(addEntity(createActivity));
        dispatch(navigation.navigateBackSwitch())
        // dispatch(stopLoading());
      })
      .catch(error => {
        console.log('Error: ', error);
        // dispatch(stopLoading())
      })
  };
};

export const deleteEntity = payload => {
  return dispatch => {
    // dispatch(startLoading());
    axios.post(baseUrl, {
      query: deleteActivityQuery(),
      variables: JSON.stringify({id: payload})
    })
      .then(response => {
        const {id} = response.data.data.deleteActivity;
        dispatch(removeEntity(id))
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
        dispatch(addEntities(mapNodesFromJson(edges)));
      })
      .catch(() => {
        console.log('Error')
      })
  }
};
