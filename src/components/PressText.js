import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors, Typography } from '../styles';

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
    alignSelf: 'center',
    color: Colors.white,
    textAlign: 'center',
    fontSize: Typography.small,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    borderStyle: 'dashed',
    marginBottom: 2,
  },
});
