import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { MainButton } from '../components';
import { Colors, Typography } from '../styles';

const Finished = ({ navigation, route }) => {
  const next = () => {
    // navigation.navigate('Home');
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Home' }],
    // });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.contentImage}>
      </View> */}
      <View style={styles.contentText}>
        <Image
          style={styles.image}
          source={require('../../assets/done.png')}
          resizeMode='center'
        />
        <Text style={styles.headingText}>¡Felicidades!</Text>
        <View style={styles.paragraph}>
          <Text style={styles.text}>Gracias por utilizar Twixbus</Text>
          <Text style={styles.text}>Disfruta de tu viaje</Text>
        </View>
        <MainButton text='Regresar al inicio' disabled={true} onPress={next} />
      </View>
    </View>
  );
};

export default Finished;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // #
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
    marginBottom: 25,
  },
  contentText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  headingText: {
    fontSize: Typography.heading,
    color: Colors.dark,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  paragraph: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  text: {
    fontSize: Typography.normal,
    color: Colors.dark,
    textAlign: 'center',
  },
});
