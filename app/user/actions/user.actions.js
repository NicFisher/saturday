export const ADD = '[Add] Add';
export const START_LOADING = '[User] Start Loading';
export const STOP_LOADING = '[User] Stop Loading';

export const add = (payload) => ({
  type: ADD,
  payload
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
});
