import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { StyleSheet, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ({ myTrip }) => {
  const [boardingDate, setBoardingDate] = useState('');
  const [boardingTime, setBoardingTime] = useState('');

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
        <Image
          style={styles.logoCompany}
          source={require('../../../assets/icon.png')}
        />
        <Text style={styles.nameCompany}>{myTrip.company}</Text>
      </View>
      <View style={styles.infoContent}>
        <View style={styles.columnContent}>
          <Text style={styles.dateMessage}>Fecha viaje</Text>
          <Text style={styles.time}>{boardingTime}</Text>
          <Text style={styles.date}>{boardingDate}</Text>
        </View>
        <View style={styles.columnContent}>
          <Icon name='bus' size={50} color='#000' />
          <Text style={styles.plate}>{myTrip.carPlate}</Text>
        </View>
      </View>
      {/* {parseInt(myTrip.tickets) === 1 ? (
        <>
          <Text>Total: {myTrip.total}</Text>
        </>
      ) : (
        <>
          <Text>Precio: {myTrip.price}</Text>

          <Text>Ticketes: {myTrip.tickets}</Text>
          <Text>Total: {myTrip.total}</Text>
        </>
      )}
      <Icon name='ticket' size={50} color='#000' />
      <Icon name='bus' size={50} color='#000' /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
    borderColor: 'rgba(102, 45, 145, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  headerCompany: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: 'rgba(102, 45, 145, 0.2)',
    borderBottomWidth: 1,
    borderRadius: 1,
    paddingBottom: 10,
  },
  logoCompany: {
    width: 50,
    height: 50,
  },
  nameCompany: {
    flexGrow: 1,
    fontSize: 30,
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
    fontSize: 12,
    fontWeight: '100',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
  },
  plate: {
    paddingTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
