import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainStackScreen from './MainStack';
import Logo from '../components/MenuLogo';

const AppStack = createStackNavigator();

export default function AppStackScreen() {
  return (
    <AppStack.Navigator initialRouteName='App'>
      <AppStack.Screen
        name='App'
        component={MainStackScreen}
        options={({ navigation }) => ({
          initialRouteName: 'App',
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#662d91',
          },
          headerTintColor: '#eee',
          //   headerRight: () => <ButtonMenu navigation={navigation} />,
        })}
      />
    </AppStack.Navigator>
  );
}
