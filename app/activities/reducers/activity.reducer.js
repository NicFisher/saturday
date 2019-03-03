import * as activities from '../actions/activity.action';
import {Map} from 'immutable';

const initialState = {
  entities: Map(),
  selectedEntityId: null
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
    case activities.REMOVE_SELECTED:
      return {...state, selectedEntityId: null};
    case activities.SELECT:
      return {...state, selectedEntityId: action.payload};
    default:
      return state;
  }
};

export const getEntitiesArray = state => state.activities.entities
  .sortBy(entity => entity.scheduledDate)
  .toArray();

export const getEntities = state => state.entities;

export const getSelectedEntityId = state => state.selectedEntityId;

export const getFormValues = state => {
  if (!state) return;
  const {kind, status, title, scheduledDate, duration, createdAt, description} = state;
  return {title, kind, status, scheduledDate, duration, createdAt, description}
};



