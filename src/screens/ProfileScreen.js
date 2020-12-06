import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { signOut } from '../reducers/user';
import { firebase } from '../utils/Firebase';

const ProfileScreen = ({ navigation, data, signOut }) => {
  const disconnect = () => {
    firebase.auth().signOut();
    // signOut();
  };

  return (
    <View>
      <Text>Profile!</Text>
      <Button title='Cerrar sesión' onPress={disconnect} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { data: state.user };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
