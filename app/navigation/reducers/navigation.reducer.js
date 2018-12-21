import * as navigation from '../actions/navigation.action';

const initialState = {
  navigateBack: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case navigation.NAVIGATE_BACK_SWITCH:
      return {...state, navigateBack: !state.navigateBack};
    default:
      return state;
  }
};

export const getNavigateBack = state => state.navigation.navigateBack;
