import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ({ myTrip, formatDate }) => {
  return (
    <View style={styles.container}>
      <Text>{myTrip.carPlate}</Text>
      <Text>{myTrip.company}</Text>
      <Text>{formatDate}</Text>
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
    backgroundColor: '#fff',
  },
});
