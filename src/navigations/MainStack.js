import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconStack from './IconStack';
import QRStackScreen from './QRStack';
import * as screens from '../screens';

const MainStack = createBottomTabNavigator();

export default function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <IconStack
              name={route.name}
              focused={focused}
              size={size}
              color={color}
            />
          );
        },
        tabBarVisible: true,
      })}
      tabBarOptions={{
        activeTintColor: 'rgba(102, 45, 145, 1)',
        inactiveTintColor: '#ccc',
        showLabel: false,
        labelPosition: 'below-icon',
        keyboardHidesTabBar: true,
      }}
    >
      <MainStack.Screen name='Home' component={screens.HomeScreen} />
      <MainStack.Screen
        name='QRStack'
        component={QRStackScreen}
        options={({ navigation }) => ({
          tabBarVisible: false,
        })}
      />
      <MainStack.Screen name='Profile' component={screens.ProfileScreen} />
    </MainStack.Navigator>
  );
}
