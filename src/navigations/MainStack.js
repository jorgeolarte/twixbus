import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconStack from './IconStack';
import QRStackScreen from './QRStack';
import * as screens from '../screens';
import { Colors } from '../styles';
import { reset } from '../reducers/scan';

const MainStack = createBottomTabNavigator();

const MainStackScreen = ({ reset }) => {
  return (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <IconStack
              name={route.name}
              focused={focused}
              size={30}
              color={color}
            />
          );
        },
        tabBarVisible: true,
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.disabled,
        showLabel: false,
        labelPosition: 'below-icon',
        keyboardHidesTabBar: true,
        style: {
          height: 55,
        },
      }}
    >
      <MainStack.Screen name='Home' component={screens.HomeScreen} />
      <MainStack.Screen
        name='QRStack'
        component={QRStackScreen}
        options={({ navigation }) => ({
          tabBarVisible: false,
        })}
        listeners={{
          tabPress: (e) => reset(),
        }}
      />
      <MainStack.Screen name='Profile' component={screens.ProfileScreen} />
    </MainStack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainStackScreen);
