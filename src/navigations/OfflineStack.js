import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as screens from '../screens';

const OfflineStack = createStackNavigator();

export default function OfflineStackScreen() {
  return (
    <OfflineStack.Navigator initialRouteName='Offline' headerMode='none'>
      <OfflineStack.Screen
        name='Offline'
        component={screens.OfflineScreen}
        options={{ title: 'Desconectado', headerShown: false }}
      />
    </OfflineStack.Navigator>
  );
}
