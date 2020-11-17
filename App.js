import React from 'react';
import { NetworkProvider } from 'react-native-offline';
import { Provider } from 'react-redux';
import MyApp from './src/index';
import store from './src/store';

export default function () {
  return (
    <Provider store={store}>
      <NetworkProvider>
        <MyApp />
      </NetworkProvider>
    </Provider>
  );
}
