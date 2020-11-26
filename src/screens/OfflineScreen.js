import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  offlineActionCreators,
  checkInternetConnection,
} from 'react-native-offline';
import { StyleSheet, View, Text, Image } from 'react-native';
import { MainButton } from '../components';

const { connectionChange } = offlineActionCreators;

const OfflineScreen = ({ navigation, route, network, connectionChange }) => {
  useEffect(() => {
    return checkConnection;
  }, []);

  const checkConnection = async () => {
    const connection = await checkInternetConnection(
      'https://google.com',
      1000,
      true,
      'HEAD'
    );
    console.log('OfflineScreen 1: ', connection);
    connectionChange(connection);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentImage}>
        <Image
          style={styles.image}
          source={require('../../assets/offline.png')}
          resizeMode='center'
        />
      </View>
      <View style={styles.contentText}>
        <Text style={styles.headingText}>Oooops! {route.params?.carPlate}</Text>
        <View style={styles.paragraph}>
          <Text style={styles.text}>Conexión a Internet lenta o nula</Text>
          <Text style={styles.text}>
            Por favor revisa tu configuración de Internet
          </Text>
        </View>
        <MainButton
          text='Revisar conexión'
          disabled={!network.isConnected}
          onPress={() => checkConnection()}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { network: state.network };
};

const mapDispatchToProps = (dispatch) => ({
  connectionChange: (isConnected) => dispatch(connectionChange(isConnected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OfflineScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(102, 45, 145, 1)', // #
    alignItems: 'stretch',
    justifyContent: 'center',
    // padding: 20,
  },
  contentImage: {
    flex: 2,
    alignContent: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)', // #
    padding: 50,
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
  contentText: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  headingText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  paragraph: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
