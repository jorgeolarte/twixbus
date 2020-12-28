import React from 'react';
import { Provider } from 'react-redux';
import { ReduxNetworkProvider } from 'react-native-offline';
import { PersistGate } from 'redux-persist/integration/react';
import MyApp from './src/index';
import { store, persistor } from './src/store';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn:
    'https://0623ec5a03fb4930926273fb7a8fb558@o493543.ingest.sentry.io/5563107',
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  tracesSampleRate: 1,
});

export default function () {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxNetworkProvider
          pingTimeout={1000}
          pingServerUrl="https://google.com"
          pingInterval={30000}
          httpMethod="HEAD"
          pingInBackground={true}
          pingOnlyIfOffline={true}
        >
          <MyApp />
        </ReduxNetworkProvider>
      </PersistGate>
    </Provider>
  );
}
