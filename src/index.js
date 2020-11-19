import { StatusBar } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as navigations from './navigations';

const RootStack = createStackNavigator();

const MyApp = ({ isConnected, userUid }) => {
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
          ) : userUid === null ? (
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
    userUid: state.user.userUid,
    isConnected: state.network.isConnected,
  };
};

export default connect(mapStateToProps)(MyApp);
