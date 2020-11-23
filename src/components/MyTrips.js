import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import ItemTrip from './ItemTrip';
import Firebase from '../utils/Firebase';

export default ({ userUid }) => {
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyTrips = () => {
      Firebase.database()
        .ref(`mytrips/${userUid}/`)
        .orderByKey()
        .on('value', (snapshot) => {
          addedTrip(snapshot);
        });
    };

    return fetchMyTrips();
  }, []);

  const addedTrip = (snapshot) => {
    setLoading(true);
    try {
      setMyTrips([]);
      snapshot.forEach((myTrip) => {
        let tempTrip = myTrip.toJSON();
        tempTrip.prettyDate = DateTime.fromMillis(
          parseInt(tempTrip.createdAt)
        ).toLocaleString(DateTime.DATETIME_MED);
        setMyTrips((trips) => [...trips, tempTrip]);
      });
    } catch (err) {
      console.log('error: ', err);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <View>
      <ActivityIndicator size='large' color='rgba(102, 45, 145, 1)' />
    </View>
  ) : (
    <FlatList
      style={styles.container}
      data={Object.assign([], myTrips).reverse()}
      renderItem={({ item }) => <ItemTrip myTrip={item} />}
      keyExtractor={(myTrip) => String(myTrip.createdAt)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});
