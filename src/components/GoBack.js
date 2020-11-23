import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ({ onPress, navigation }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log('index: ', index);

    try {
      setIndex(navigation.dangerouslyGetState().routes[0].state);
    } catch (err) {}
  }, []);

  return index > 0 ? (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor='rgba(102, 45, 145, 0.8)'
      style={styles.button}
      onPress={onPress}
    >
      <Icon name='angle-left' size={30} color='#fff' style={styles.icon} />
    </TouchableHighlight>
  ) : null;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(102, 45, 145, 1)',
  },
  icon: {
    // padding: 20,
    margin: 10,
  },
});
