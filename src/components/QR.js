import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Vibration,
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Linking from 'expo-linking';
import { set } from 'react-native-reanimated';

const QR = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(false);
  const [flashMode, setFlashMode] = useState('off');
  const [scanned, setScanned] = useState(false);

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
    } else {
      let { path } = Linking.parse(data);
      flash ? changeFlash() : null;
      navigation.navigate('Ticket', { carPlate: path });
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Solicitando permiso de cámara</Text>
      ) : hasPermission === false ? (
        <Text>Sin acceso a la cámara</Text>
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
                activeOpacity={0}
                underlayColor='rgba(102, 45, 145, 0.8)'
                style={styles.button}
                onPress={changeFlash}
              >
                <Icon
                  name='lightbulb'
                  solid={flash}
                  size={40}
                  color='#fff'
                  style={styles.icon}
                />
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor='rgba(102, 45, 145, 0.8)'
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                <Icon name='times' size={40} color='#fff' style={styles.icon} />
              </TouchableHighlight>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default QR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    fontSize: 24,
    color: '#fff',
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
    // flex: 1,
    // alignItems: 'center',
    backgroundColor: 'rgba(102, 45, 145, 1)',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 200,
  },
  icon: {
    padding: 30,
  },
});
