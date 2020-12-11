import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconStack from './IconStack';
import QRStackScreen from './QRStack';
import * as screens from '../screens';
import { Colors } from '../styles';
import { reset } from '../reducers/scan';
import { loadUser } from '../reducers/user';
import { firebase } from '../utils/Firebase';

const MainStack = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const MainStackScreen = ({ user, reset, loadUser }) => {
  const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  useEffect(() => {
    const loadingUser = () => {
      firebase
        .database()
        .ref(`/users/${user.userUid}/`)
        .on('value', (snapshot) => {
          loadUser(snapshot.toJSON());
        });
    };
    return loadingUser();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('************************');
        // console.log('response: ', response);
        let { url } = response.notification.request.content.data;
        if (typeof url !== 'undefined') {
          Linking.openURL(url);
          console.log('url: ', url);
        } else {
          console.log('No hay nada');
        }
      }
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    (() => registerForPushNotificationsAsync())();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (token) {
      const res = await firebase
        .database()
        .ref(`/users/${user.userUid}`)
        .update({ expoToken: token });
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  };

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
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset()),
  loadUser: (user) => dispatch(loadUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainStackScreen);
