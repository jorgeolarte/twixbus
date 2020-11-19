import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { signOut } from '../reducers/user';
import { NewUser } from '../components';

const HomeScreen = ({ navigation, data, signOut }) => {
  console.log('-------9--------');
  // console.log('homescreen: ', isNew);
  console.log('data: ', data);
  // console.log('loading: ', loading);
  // console.log('error: ', error);

  return (
    <View>
      <NewUser />
      <Text>Signed in!</Text>
      <Button title='Perfil' onPress={() => navigation.navigate('Profile')} />
      <Button title='Cerrar sesión' onPress={() => signOut()} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { data: state.user };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
