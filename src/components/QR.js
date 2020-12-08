import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Vibration,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Linking from 'expo-linking';
import { setCarPlate, onScanned, offScanned } from '../reducers/scan';
import { Colors, Typography } from '../styles';
import { useNavigation } from '@react-navigation/native';

const QR = ({ scan, setCarPlate, onScanned, offScanned }) => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(false);
  const [flashMode, setFlashMode] = useState('off');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const changeFlash = () => {
    setFlash(!flash);
    setFlashMode(!flash ? 'torch' : 'off');
  };

  const scanning = ({ type, data }) => {
    Vibration.vibrate();
    let regex = /^(twixbus)+(:\/\/)+(bus)+(\/)+[a-zA-Z0-9]{6}$/gm;
    if (data.match(regex) === null) {
      console.log('No ha escaneado un codigo valido');
      Alert.alert(
        'Código invalido',
        'El código que intentas escanear no pertenece a uno de nuestros buses.'
      );
      offScanned();
    } else {
      let { path } = Linking.parse(data);
      flash ? changeFlash() : null;
      setCarPlate(path);
      onScanned();
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <View style={styles.permissions}>
          <ActivityIndicator color={Colors.primary} size='large' />
          <Text style={styles.text}>Solicitando permiso de cámara</Text>
        </View>
      ) : hasPermission === false ? (
        <View style={styles.permissions}>
          <Text style={styles.text}>No podemos escanear el código QR</Text>
          <Text style={styles.text}>Sin acceso a la cámara</Text>
        </View>
      ) : (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          flashMode={flashMode}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanning}
        >
          <View style={styles.cameraContainer}>
            <View style={styles.headingContent}>
              <Text style={styles.heading}>Escanea el código QR</Text>
            </View>
            <View style={styles.image}>
              <Image
                source={require('../../assets/qrScanner.png')}
                width={100}
                height={100}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={Colors.hover.primary}
                style={styles.button}
                onPress={changeFlash}
              >
                <Icon
                  name='lightbulb'
                  solid={flash}
                  size={40}
                  color={Colors.white}
                  style={styles.icon}
                />
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={Colors.hover.primary}
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                <Icon
                  name='times'
                  size={40}
                  color={Colors.white}
                  style={styles.icon}
                />
              </TouchableHighlight>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { scan: state.scan };
};

const mapDispatchToProps = (dispatch) => ({
  setCarPlate: (carPlate) => dispatch(setCarPlate(carPlate)),
  onScanned: () => dispatch(onScanned()),
  offScanned: () => dispatch(offScanned()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QR);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Typography.normal,
    color: Colors.dark,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    // resizeMode: 'cover',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  headingContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    backgroundColor: Colors.hover.dark,
    padding: 20,
    fontSize: Typography.types.qr,
    fontWeight: 'bold',
    color: Colors.white,
  },
  image: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    bottom: 30,
  },
  button: {
    backgroundColor: Colors.primary,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 200,
  },
  icon: {
    padding: 30,
  },
});
