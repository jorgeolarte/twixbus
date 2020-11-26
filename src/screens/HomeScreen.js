import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import { signOut } from '../reducers/user';
import { NewUser, QRButton, MyTrips } from '../components';

const HomeScreen = ({ navigation, data, signOut }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <NewUser navigation={navigation} />
        <MyTrips userUid={data.userUid} />
      </View>
      <QRButton />
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
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    padding: 10,
  },
});
