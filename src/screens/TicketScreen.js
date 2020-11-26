import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TicketScreen = ({ navigation, route }) => {
  const { carPlate } = route.params;

  return (
    <View>
      <Text>Placa {carPlate}</Text>
    </View>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
