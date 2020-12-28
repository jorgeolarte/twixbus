import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  checkInternetConnection,
  offlineActionCreators,
} from 'react-native-offline';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as navigations from './navigations';
import { signIn, signOut, loadUser } from './reducers/user';
import RoutesConfig from './utils/Routes';

const { connectionChange } = offlineActionCreators;
const RootStack = createStackNavigator();

const MyApp = ({ user, network, signOut, connectionChange }) => {
  const linking = {
    prefixes: ['https://twixbus.com', 'twixbus://'],
    RoutesConfig,
  };

  useEffect(() => {
    const internetChecker = async () => {
      const isConnected = await checkInternetConnection();
      // Dispatching can be done inside a connected component, a thunk (where dispatch is injected), saga, or any sort of middleware
      console.log('isConnected: ', isConnected);
      // In this example we are using a thunk
      connectionChange(isConnected);
    };

    if (typeof user.phoneNumber === 'undefined') {
      signOut();
    }

    return () => internetChecker();
  }, []);

  return (
    <>
      <StatusBar
        style="auto"
        backgroundColor="#662d91"
        barStyle="light-content"
      />
      <NavigationContainer linking={linking}>
        <RootStack.Navigator initialRouteName="Login" headerMode="none">
          {!network.isConnected ? (
            <RootStack.Screen
              name="Offline"
              component={navigations.OfflineStack}
            />
          ) : user.userUid === null ? (
            <RootStack.Screen name="Login" component={navigations.LoginStack} />
          ) : (
            <RootStack.Screen
              name="AppStack"
              component={navigations.AppStack}
            />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    network: state.network,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (userUid) => dispatch(signIn(userUid)),
  signOut: () => dispatch(signOut()),
  connectionChange: (isConnected) => dispatch(connectionChange(isConnected)),
  loadUser: (user) => dispatch(loadUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);
