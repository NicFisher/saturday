import axios from "axios";
import {baseUrl} from "../../axios/helper";
import {createActivityQuery, fetchActivityQuery} from "../queries/activities.query";
import {mapNodesFromJson} from "../../common/mappers";

export const ADD_ENTITY = "[ACTIVITY] Add Entity";
export const ADD_ENTITIES = "[ACTIVITY] Add Entities";
export const REMOVE_ENTITY = "[ACTIVITY] Remove Entity";

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
        // dispatch(stopLoading());
      })
      .catch(error => {
        console.log('Error: ', error);
        // dispatch(stopLoading())
      })
  };
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
