import * as fromActivities from "../reducers/activity.reducer";
import {createSelector} from "reselect";

const getStateModule = state => state.activities;

const getSelectedEntityId = createSelector(
  getStateModule,
  fromActivities.getSelectedEntityId
);

const getEntities = createSelector(
  getStateModule,
  fromActivities.getEntities
);

export const getSelectedEntity = createSelector(
  getEntities,
  getSelectedEntityId,
  (entities, id) => entities.get(id)
);

export const getFormValues = createSelector(
  getSelectedEntity,
  fromActivities.getFormValues
);