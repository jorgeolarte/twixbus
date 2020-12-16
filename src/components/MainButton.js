import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../styles';

const MainButton = (props) => {
  const [loading, setLoading] = useState(false);

  const beforePress = () => {
    setLoading(true);
    setTimeout(() => {
      props.onPress();
      setLoading(false);
    }, 1500);
  };

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={Colors.hover.secondary}
      style={[styles.button, !props.disabled ? styles.buttonDisabled : null]}
      disabled={!props.disabled}
      onPress={beforePress}
    >
      <Text style={[styles.text, !props.disabled ? styles.textDisabled : null]}>
        {loading ? <ActivityIndicator color={Colors.white} /> : props.text}
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
