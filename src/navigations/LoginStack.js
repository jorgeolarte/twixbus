import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as screens from '../screens';

const LoginStack = createStackNavigator();

export default function LoginStackScreen() {
  return (
    <LoginStack.Navigator initialRouteName='Login' headerMode='screen'>
      <LoginStack.Screen
        name='Login'
        component={screens.LoginScreen}
        options={{ title: 'Iniciar sesión', headerShown: false }}
      />
      <LoginStack.Screen
        name='Code'
        component={screens.CodeScreen}
        options={{
          title: null,
          headerTransparent: true,
          headerShown: true,
          headerTintColor: 'rgba(102, 45, 145, 1)',
        }}
      />
    </LoginStack.Navigator>
  );
}
