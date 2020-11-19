import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainStackScreen from './MainStack';
import { MenuLogo, Amount } from '../components';

const AppStack = createStackNavigator();

export default function AppStackScreen() {
  return (
    <AppStack.Navigator initialRouteName='App'>
      <AppStack.Screen
        name='App'
        component={MainStackScreen}
        options={({ navigation }) => ({
          initialRouteName: 'App',
          headerTitle: () => <MenuLogo />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#662d91',
          },
          headerTintColor: '#eee',
          headerRight: () => <Amount />,
        })}
      />
    </AppStack.Navigator>
  );
}
