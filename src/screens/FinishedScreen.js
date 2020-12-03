import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { MainButton } from '../components';
import { Colors, Typography } from '../styles';
import { onScanned, offScanned } from '../reducers/scan';

const FinishedScreen = ({ navigation, route, scan, onScanned, offScanned }) => {
  useEffect(() => {
    const preventBack = () => {
      navigation.addListener('beforeRemove', (e) => {
        console.log('intento regresar: ', scan);

        scan.scanned ? offScanned() : onScanned();

        e.preventDefault();
      });
    };

    return preventBack();
  }, [navigation]);

  const next = () => {
    scan.scanned ? offScanned() : onScanned();
    navigation.navigate('Home');
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
        <MainButton
          text='Regresar al inicio'
          disabled={true}
          onPress={() => next()}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { scan: state.scan };
};

const mapDispatchToProps = (dispatch) => ({
  onScanned: () => dispatch(onScanned()),
  offScanned: () => dispatch(offScanned()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinishedScreen);

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
