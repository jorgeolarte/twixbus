import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import ItemTrip from './ItemTrip';
import { firebase } from '../utils/Firebase';
import { Colors, Typography } from '../styles';

export default ({ userUid }) => {
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyTrips = () => {
      firebase
        .database()
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
        setMyTrips((trips) => [...trips, myTrip.toJSON()]);
      });
    } catch (err) {
      console.log('error: ', err);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  ) : myTrips.length === 0 ? (
    <View style={styles.container}>
      <Text style={styles.heading}>¡Ooops!</Text>
      <Text style={styles.subheading}>Aún no tienes viajes</Text>
      <Image
        style={styles.image}
        source={require('../../assets/noTrips.png')}
        resizeMode='center'
      />
      <Text style={styles.text}>Toma tu primer viaje</Text>
      <Text style={styles.text}>Disfruta la experiencia Twixbus</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={Object.assign([], myTrips).reverse()}
        renderItem={({ item }) => <ItemTrip myTrip={item} />}
        keyExtractor={(myTrip) => String(myTrip.createdAt)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    // padding: 20,
  },
  heading: {
    fontSize: Typography.heading,
    color: Colors.dark,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheading: {
    fontSize: Typography.subheading,
    color: Colors.dark,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
  text: {
    // backgroundColor: '#f00',
    fontSize: Typography.normal,
    color: Colors.dark,
    textAlign: 'center',
  },
});
