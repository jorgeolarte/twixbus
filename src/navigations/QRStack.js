import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as screens from '../screens';

const QRStack = createStackNavigator();

export default function QRStackScreen() {
  return (
    <QRStack.Navigator initialRouteName='Home' headerMode='none'>
      <QRStack.Screen name='Scanner' component={screens.ScannerScreen} />
      <QRStack.Screen name='Ticket' component={screens.TicketScreen} />
    </QRStack.Navigator>
  );
}
