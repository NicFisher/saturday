import * as fromActivities from '../activities/reducers/activity.reducer';
import * as fromAuth from '../auth/reducers/auth.reducer';
import * as fromNavigation from '../navigation/reducers/navigation.reducer';
import * as fromUser from '../user/reducers/user.reducer';
import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form'

const appReducer = combineReducers({
  form,
  activities: fromActivities.reducer,
  auth: fromAuth.reducer,
  navigation: fromNavigation.reducer,
  user: fromUser.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === '[AUTH] Logout') {
    state = undefined
  }
  return appReducer(state, action)
};

export default rootReducer;
