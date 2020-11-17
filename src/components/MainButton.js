import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

const MainButton = (props) => {
  return (
    <TouchableHighlight
      style={[styles.button, !props.disabled ? styles.buttonDisabled : null]}
      disabled={!props.disabled}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableHighlight>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1F914C',
    padding: 15,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(31, 145, 75, 0.5)', // #1F914C
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});
