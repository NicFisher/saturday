export const ADD_ENTITY = "[ACTIVITY] Add Entity";
export const ADD_ENTITIES = "[ACTIVITY] Add Entities";
export const REMOVE_ENTITY = "[ACTIVITY] Remove Entity";

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
