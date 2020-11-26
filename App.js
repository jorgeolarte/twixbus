import React from 'react';
import { Provider } from 'react-redux';
import { ReduxNetworkProvider } from 'react-native-offline';
import { PersistGate } from 'redux-persist/integration/react';
import MyApp from './src/index';
import { store, persistor } from './src/store';

export default function () {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxNetworkProvider
          pingTimeout={1000}
          pingServerUrl='https://google.com'
          pingInterval={30000}
          httpMethod='HEAD'
          pingInBackground={true}
          pingOnlyIfOffline={true}
        >
          <MyApp />
        </ReduxNetworkProvider>
      </PersistGate>
    </Provider>
  );
}
