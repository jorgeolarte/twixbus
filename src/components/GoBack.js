import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ({ onPress, navigation, route }) => {
  const [index, setIndex] = useState(0);

  // console.log('dangerouslyGetState: ', navigation.dangerouslyGetState());

  useEffect(() => {
    // const unsubscribe = navigation.addListener('state', (target) => {
    //   // do something
    //   console.log('--------------2------------');
    //   console.log('e data: ', target);
    //   // e.preventDefault();
    // });
    // return unsubscribe;
  }, []);

  // useEffect(() => {
  //   try {
  //     console.log('index: ', index);
  //     console.log(
  //       'dangerouslyGetState: ',
  //       navigation.dangerouslyGetState().routes[0].state.index
  //     );
  //     setIndex(navigation.dangerouslyGetState().routes[0].state.index);
  //   } catch (err) {
  //     console.log('error: ', err);
  //   }
  // }, []);

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
