import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as screens from '../screens';

const MainStack = createStackNavigator();

export default function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName='Home' headerMode='none'>
      <MainStack.Screen name='Home' component={screens.HomeScreen} />
      <MainStack.Screen name='Profile' component={screens.ProfileScreen} />
      <MainStack.Screen name='QR' component={screens.QRScreen} />
    </MainStack.Navigator>
  );
}
