import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import ItemTrip from './ItemTrip';
import Firebase from '../utils/Firebase';

export default ({ userUid }) => {
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setMyTrips([]);
    return getMyTrips();
  }, []);

  function getMyTrips() {
    try {
      Firebase.database()
        .ref(`mytrips/${userUid}/`)
        // .orderByChild('createdAt')
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((trip) => {
            setMyTrips((trips) => [...trips, trip.toJSON()]);
          });
        });

      setLoading(false);
    } catch (err) {
      console.log('Error: ', err);
      setLoading(true);
    }
  }

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const refreshComponent = () => {
    setRefreshing(true);
    setMyTrips([]);
    getMyTrips();
    wait(2000).then(() => setRefreshing(false));
  };

  return loading ? (
    <View>
      <ActivityIndicator size='large' color='rgba(102, 45, 145, 1)' />
    </View>
  ) : (
    <FlatList
      data={myTrips.reverse()}
      renderItem={({ item }) => <ItemTrip myTrip={item} />}
      keyExtractor={(myTrip) => String(myTrip.createdAt)}
      refreshControl={
        <RefreshControl
          color='rgba(102, 45, 145, 1)'
          refreshing={refreshing}
          onRefresh={refreshComponent}
        />
      }
    />
  );
};

const styles = StyleSheet.create({});
