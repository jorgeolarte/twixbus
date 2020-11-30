import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { NewUser, MyTrips } from '../components';
import { Colors } from '../styles';

const HomeScreen = ({ navigation, data }) => {
  return (
    <View style={styles.container}>
      <NewUser navigation={navigation} />
      <MyTrips userUid={data.userUid} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { data: state.user };
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    padding: 10,
  },
});
