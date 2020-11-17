import React from 'react';
import { connect } from 'react-redux';
import {
  offlineActionCreators,
  checkInternetConnection,
} from 'react-native-offline';
import { StyleSheet, View, Text } from 'react-native';
import { Logo, MainButton } from '../components';

const OfflineScreen = (isConnected) => {
  return (
    <View style={styles.container}>
      <Logo
        flex={1}
        justifyContent='flex-end'
        image={require('../../assets/offline.png')}
      />
      <View style={styles.contentText}>
        <Text style={styles.headingText}>Oooops!</Text>
        <View style={styles.paragraph}>
          <Text style={styles.text}>Conexión a Internet lenta o nula</Text>
          <Text style={styles.text}>
            Por favor revisa tu configuración de Internet
          </Text>
        </View>
        <MainButton
          text='Revisar conexión'
          disabled={!isConnected.isConnected}
          onPress={() => isConnected.connectionChange()}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { isConnected: state.network.isConnected };
};

const mapDispatchToProps = (dispatch) => ({
  connectionChange: () => {
    let isConnected;
    checkInternetConnection().then((x) => (isConnected = x));
    dispatch(offlineActionCreators.connectionChange(isConnected));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OfflineScreen);

// export default OfflineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(102, 45, 145, 1)', // #
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
  },
  contentText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
