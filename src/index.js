import { StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  checkInternetConnection,
  offlineActionCreators,
} from 'react-native-offline';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as navigations from './navigations';
import { signIn, signOut, loadUser } from './reducers/user';
import { firebase } from './utils/Firebase';
import RoutesConfig from './utils/Routes';

const { connectionChange } = offlineActionCreators;
const RootStack = createStackNavigator();

const MyApp = ({
  user,
  network,
  signOut,
  connectionChange,
  signIn,
  loadUser,
}) => {
  const [uid, setUid] = useState(null);
  const [exist, setExist] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const linking = {
    prefixes: ['https://twixbus.com', 'twixbus://'],
    RoutesConfig,
  };

  const reset = () => {
    setUid(null);
    setExist(false);
    setIsSignIn(false);
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        console.log('cerro sesión');
        signOut();
        reset();
      } else {
        console.log('inicio sesión: ', user.uid);
        setIsSignIn(true);
        setUid(user.uid);
        signIn(user.uid);
      }
    });

    return subscriber;
  }, []);

  useEffect(() => {
    const userExist = () => {
      try {
        if (uid !== null && isSignIn) {
          firebase
            .database()
            .ref(`users/${uid}`)
            .once('value')
            .then((snapshot) => {
              setExist(snapshot.exists());
            });
        }
      } catch (err) {
        console.log('userExist: ', err);
      }
    };

    return userExist();
  }, [uid, setUid]);

  useEffect(() => {
    const createUser = () => {
      try {
        if (isSignIn) {
          if (exist) {
            firebase
              .database()
              .ref(`users/${uid}/`)
              .once('value')
              .then((snapshot) => {
                loadUser(snapshot.toJSON());
              });
          } else {
            let newUser = {
              phoneNumber: user.phoneNumber,
              amount: user.amount,
              isNew: user.isNew,
            };
            firebase.database().ref(`users/${uid}`).set(newUser);
          }
        }
      } catch (err) {
        console.log('createUser: ', err);
      }
    };

    return createUser();
  }, [exist, setExist]);

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
      <StatusBar style='auto' backgroundColor='#662d91' />
      <NavigationContainer linking={linking}>
        <RootStack.Navigator initialRouteName='Login' headerMode='none'>
          {!network.isConnected ? (
            <RootStack.Screen
              name='Offline'
              component={navigations.OfflineStack}
            />
          ) : user.userUid === null ? (
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
    user: state.user,
    network: state.network,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (userUid) => dispatch(signIn(userUid)),
  signOut: () => dispatch(signOut()),
  loadUser: (user) => dispatch(loadUser(user)),
  connectionChange: (isConnected) => dispatch(connectionChange(isConnected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);
