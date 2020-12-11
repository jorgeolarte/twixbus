import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainStackScreen from './MainStack';
import RechargeScreen from '../screens/RechargeScreen';
import { MenuLogo, Amount, GoBack } from '../components';

const AppStack = createStackNavigator();

export default function AppStackScreen() {
  return (
    <AppStack.Navigator
      initialRouteName='App'
      screenOptions={() => ({
        initialRouteName: 'App',
        headerTitle: () => <MenuLogo />,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#662d91',
        },
        headerTintColor: '#eee',
        headerRight: () => <Amount />,
      })}
    >
      <AppStack.Screen name='MainStack' component={MainStackScreen} />
      <AppStack.Screen name='Recharge' component={RechargeScreen} />
    </AppStack.Navigator>
  );
}
