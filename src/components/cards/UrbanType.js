import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import Firebase from '../../utils/Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Typography } from '../../styles';

export default ({ myTrip }) => {
  const [logoLoading, setLogoLoading] = useState(true);
  const [logoCompany, setLogoCompany] = useState(null);

  const [boardingDate, setBoardingDate] = useState('');
  const [boardingTime, setBoardingTime] = useState('');

  useEffect(() => {
    const loadImage = () => {
      Firebase.storage()
        .ref(`companies/${myTrip.idCompany}.jpg`)
        .getDownloadURL()
        .then((url) => {
          setLogoCompany(url);
          setLogoLoading(false);
        })
        .catch((error) => {
          //------
          // TODO
          // Cargar logo por defecto
          //------
          console.log('firebase err: ', error);
          setLogoLoading(true);
        });
    };

    return loadImage();
  }, []);

  useEffect(() => {
    setBoardingDate(
      DateTime.fromMillis(parseInt(myTrip.createdAt)).toLocaleString(
        DateTime.DATE_MED
      )
    );

    setBoardingTime(
      DateTime.fromMillis(parseInt(myTrip.createdAt)).toLocaleString(
        DateTime.TIME_SIMPLE
      )
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerCompany}>
        {logoLoading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Image style={styles.image} source={{ uri: `${logoCompany}` }} />
        )}
        <Text style={styles.nameCompany}>{myTrip.company}</Text>
      </View>
      <View style={styles.infoContent}>
        <View style={styles.columnContent}>
          <Text style={styles.dateMessage}>Fecha viaje</Text>
          <Text style={styles.time}>{boardingTime}</Text>
          <Text style={styles.date}>{boardingDate}</Text>
        </View>
        <View style={styles.columnContent}>
          <Icon name='bus' size={50} color={Colors.dark} />
          <Text style={styles.plate}>{myTrip.carPlate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
    borderColor: Colors.invisible.primary,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  headerCompany: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: Colors.invisible.primary,
    borderBottomWidth: 1,
    borderRadius: 1,
    paddingBottom: 10,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
  nameCompany: {
    flexGrow: 1,
    fontSize: Typography.heading,
    color: Colors.dark,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  infoContent: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
  },
  columnContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dateMessage: {
    fontSize: Typography.small,
    color: Colors.dark,
    fontWeight: '100',
  },
  time: {
    fontSize: Typography.types.trip,
    color: Colors.dark,
    fontWeight: 'bold',
  },
  date: {
    fontSize: Typography.types.date,
    color: Colors.dark,
  },
  plate: {
    paddingTop: 5,
    fontSize: Typography.types.plate,
    fontWeight: 'bold',
    color: Colors.dark,
  },
});
