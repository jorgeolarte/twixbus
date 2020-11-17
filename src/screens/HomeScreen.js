import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { signOut } from '../reducers/user';

const HomeScreen = ({ navigation, data, signOut }) => {
  return (
    <View>
      <Text>Signed in!</Text>
      {/* <Button title='Sign out' onPress={() => signOut()} /> */}
      <Button title='Perfil' onPress={() => navigation.navigate('Profile')} />
      <Button title='Cerrar sesión' onPress={() => signOut()} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
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
