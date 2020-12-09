import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { setIsNew } from '../reducers/user';
import { firebase } from '../utils/Firebase';
import { Colors, Typography } from '../styles';
import { useNavigation } from '@react-navigation/native';

const NewUser = ({ user }) => {
  const navigation = useNavigation();

  return user.isNew ? (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={Colors.hover.secondary}
      style={styles.container}
      onPress={() => navigation.navigate('Profile', { screen: 'Profile' })}
    >
      <>
        <View>
          <Image
            source={require('../../assets/giftNewUser.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.contentMessage}>
          <Text style={styles.title}>Hola 😃</Text>
          <Text style={styles.text}>
            Completa tu información de usuario y recibe un viaje gratis
          </Text>
        </View>
      </>
    </TouchableHighlight>
  ) : null;
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(NewUser);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.secondary,
    marginBottom: 10,
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  contentMessage: {
    paddingLeft: 20,
    flex: 1,
  },
  title: {
    fontSize: Typography.types.newUser,
    fontWeight: 'bold',
    color: Colors.white,
    // marginBottom: 10,
    paddingBottom: 2,
  },
  text: {
    fontSize: Typography.normal,
    color: Colors.white,
    // paddingHorizontal: 10,
  },
});
