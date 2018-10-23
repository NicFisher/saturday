import React from 'react';
import AppRoot from "./app/common/components/app-root";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './app/store/AppReducer';
import thunk from 'redux-thunk';
import {AxiosRequestInterceptor} from "./app/axios/interceptors";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/lib/integration/react';
import LoadingView from "./app/common/components/loading-view";

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['activities']
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  pReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

// AxiosRequestInterceptor(store);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingView/>} persistor={persistor}>
          <AppRoot />
        </PersistGate>
      </Provider>
    );
  }
}
