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
import { signOut } from './reducers/user';

const { connectionChange } = offlineActionCreators;
const RootStack = createStackNavigator();

const MyApp = ({ data, network, signOut, connectionChange }) => {
  const config = {
    screens: {
      Offline: 'Offline',
      LoginStack: {
        screens: {
          Login: 'Login',
          Code: 'Code',
        },
      },
      AppStack: {
        screens: {
          MainStack: {
            screens: {
              Home: 'Home',
              Profile: 'Profile',
              QRStack: {
                screens: {
                  Scanner: 'Scanner',
                  Ticket: {
                    path: 'bus/:carPlate',
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  const linking = {
    prefixes: ['https://twixbus.com', 'twixbus://'],
    config,
  };

  useEffect(() => {
    const internetChecker = async () => {
      const isConnected = await checkInternetConnection();
      // Dispatching can be done inside a connected component, a thunk (where dispatch is injected), saga, or any sort of middleware
      console.log('isConnected: ', isConnected);
      // In this example we are using a thunk
      connectionChange(isConnected);
    };

    if (typeof data.phoneNumber === 'undefined') {
      signOut();
    }

    internetChecker();
  }, []);

  return (
    <>
      <StatusBar style='auto' backgroundColor='#662d91' />
      <NavigationContainer linking={linking}>
        <RootStack.Navigator initialRouteName='Login' headerMode='none'>
          {!network.isConnected ? (
            <RootStack.Screen
              name='Offline'
              component={navigations.OfflineStack}
            />
          ) : data.userUid === null ? (
            <RootStack.Screen name='Login' component={navigations.LoginStack} />
          ) : (
            <RootStack.Screen
              name='AppStack'
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
    data: state.user,
    network: state.network,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
  connectionChange: (isConnected) => dispatch(connectionChange(isConnected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);
