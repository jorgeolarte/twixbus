import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

const PressText = (props) => {
  return (
    <Text style={styles.pressText} onPress={props.onPress}>
      {props.text}
    </Text>
  );
};

export default PressText;

const styles = StyleSheet.create({
  pressText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
});
