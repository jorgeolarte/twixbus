import React from 'react';
import { Provider } from 'react-redux';
import { NetworkProvider } from 'react-native-offline';
import { PersistGate } from 'redux-persist/integration/react';
import MyApp from './src/index';
import { store, persistor } from './src/store';

export default function () {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NetworkProvider>
          <MyApp />
        </NetworkProvider>
      </PersistGate>
    </Provider>
  );
}
