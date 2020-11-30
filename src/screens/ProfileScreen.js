import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { signOut } from '../reducers/user';

const ProfileScreen = ({ navigation, data, signOut }) => {
  return (
    <View>
      <Text>Profile!</Text>
      <Button title='Regresar' onPress={signOut} />
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
