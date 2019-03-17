import * as navigation from "../../navigation/actions/navigation.action";
import axios from "axios";
import {baseUrl} from "../../axios/helper";
import {
  createActivityQuery,
  deleteActivityQuery,
  fetchActivityQuery,
  updateActivityQuery
} from "../queries/activities.query";
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
