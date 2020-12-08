import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default () => {
  return (
    <Image
      style={styles.logo}
      source={require('../../assets/menuIcon.png')}
      resizeMode='contain'
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 75,
    height: 45,
  },
});
