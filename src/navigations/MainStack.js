import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QRStackScreen from './QRStack';
import * as screens from '../screens';

const MainStack = createStackNavigator();

export default function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName='Home' headerMode='none'>
      <MainStack.Screen name='Home' component={screens.HomeScreen} />
      <MainStack.Screen name='Profile' component={screens.ProfileScreen} />
      <MainStack.Screen name='QRStack' component={QRStackScreen} />
    </MainStack.Navigator>
  );
}
