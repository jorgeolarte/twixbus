import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainStackScreen from './MainStack';
import { MenuLogo, Amount, GoBack } from '../components';

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
          headerBackTitle: 'hola',
          // headerLeft: () => (
          //   <GoBack
          //     onPress={() => navigation.goBack()}
          //     navigation={navigation}
          //     route={route}
          //   />
          // ),
        })}
      />
    </AppStack.Navigator>
  );
}
