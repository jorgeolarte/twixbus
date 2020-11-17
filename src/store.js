import * as reducers from './reducers';
import { reducer as network } from 'react-native-offline';
import { createStore, combineReducers } from 'redux';

export default createStore(
  combineReducers({
    ...reducers,
    network,
  })
);
