import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Colors, Typography } from '../styles';

const MainButton = (props) => {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={Colors.hover.secondary}
      style={[styles.button, !props.disabled ? styles.buttonDisabled : null]}
      disabled={!props.disabled}
      onPress={props.onPress}
    >
      <Text style={[styles.text, !props.disabled ? styles.textDisabled : null]}>
        {props.text}
      </Text>
    </TouchableHighlight>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.secondary,
    padding: 15,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: Colors.disabled, // #1F914C
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
  textDisabled: {
    color: Colors.dark,
  },
});
