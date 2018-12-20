import * as activities from '../actions/activity.action';
import {Map} from 'immutable';

const initialState = {
  entities: Map(),
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case activities.ADD_ENTITIES:
      return {...state, entities: state.entities.merge(action.payload)};
    case activities.ADD_ENTITY:
      const {id} = action.payload;
      const updatedEntity = {...state.entities.get(id), ...action.payload};
      return {...state, entities: state.entities.set(id, updatedEntity)};
    case activities.REMOVE_ENTITY:
      return {...state, entities: state.entities.remove(action.payload)};
    default:
      return state;
  }
};

// export const getState = state => state.activities;
export const getEntitiesArray = state => state.activities.entities
  .sortBy(entity => entity.scheduledDate)
  .toArray();
