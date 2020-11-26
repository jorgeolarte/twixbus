import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducer as network } from 'react-native-offline';
import { createNetworkMiddleware } from 'react-native-offline';
import * as reducers from './reducers';

const networkMiddleware = createNetworkMiddleware();

const rootReducer = combineReducers({
  ...reducers,
  network,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, networkMiddleware)
);

export const persistor = persistStore(store);
