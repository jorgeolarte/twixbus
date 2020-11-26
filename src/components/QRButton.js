import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ({ navigation }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor='rgba(102, 45, 145, 0.8)'
      style={styles.button}
      onPress={() => navigation.navigate('QR', { screen: 'QR' })}
    >
      <Icon name='qrcode' size={50} color='#fff' style={styles.icon} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(102, 45, 145, 1)',
    bottom: 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 200,
  },
  icon: {
    padding: 20,
  },
});
