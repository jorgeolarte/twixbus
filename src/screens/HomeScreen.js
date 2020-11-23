import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import { signOut } from '../reducers/user';
import { NewUser, QRButton, MyTrips } from '../components';
import Firebase from '../utils/Firebase';

const HomeScreen = ({ navigation, data, signOut }) => {
  // const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setMyTrips([]);
  //   getMyTrips();
  //   myTrips.map((x) =>
  //     x.createdAt == '1605889123842' ? console.log('Si') : console.log('no')
  //   );
  //   // updateMyTrips();
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <NewUser navigation={navigation} />
        <MyTrips userUid={data.userUid} />
      </ScrollView>
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
