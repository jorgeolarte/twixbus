import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as navigations from './navigations';
import { signOut } from './reducers/user';

const RootStack = createStackNavigator();

const MyApp = ({ data, isConnected, signOut }) => {
  useEffect(() => {
    if (typeof data.phoneNumber === 'undefined') {
      signOut();
    }
  }, [data]);

  return (
    <>
      <StatusBar style='auto' backgroundColor='#662d91' />
      <NavigationContainer>
        <RootStack.Navigator initialRouteName='Offline' headerMode='none'>
          {!isConnected ? (
            <RootStack.Screen
              name='Offline'
              component={navigations.OfflineStack}
            />
          ) : data.userUid === null ? (
            <RootStack.Screen name='Login' component={navigations.LoginStack} />
          ) : (
            <RootStack.Screen name='Main' component={navigations.AppStack} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.user,
    isConnected: state.network.isConnected,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);
