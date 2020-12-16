import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import PressText from './PressText';

const Terms = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const changeModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <PressText text='Terminos y condiciones' onPress={changeModal} />
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={changeModal}
      >
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <TouchableHighlight
              style={styles.headerModal}
              onPress={changeModal}
            >
              <Text style={styles.buttonModal}>Cerrar</Text>
            </TouchableHighlight>
            <WebView
              style={styles.webView}
              source={{ uri: 'https://facebook.com' }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
  },
  webView: {
    flex: 1,
  },
  headerModal: {
    backgroundColor: '#662d91',
    padding: 5,
  },
  buttonModal: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    padding: 5,
    color: '#fff',
    backgroundColor: '#1F914C',
  },
});
