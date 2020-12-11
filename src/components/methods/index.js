import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import { Colors, Typography } from '../../styles';

const Methods = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const pressMethod = async () => {
    let res = await Linking.canOpenURL('https://whatsapp.com/+573017516045');
    console.log('Puede abrir: ', res);
    setModalVisible(true);
  };

  return (
    <View style={styles.methods}>
      <View style={styles.method}>
        <Modal
          animationType='fade'
          transparent={true}
          presentationStyle='overFullScreen'
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ScrollView contentContainerStyle={styles.containerScroll}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.5)',
              }}
            >
              <Text>Para consignarnos debes</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
        <TouchableOpacity onPress={pressMethod}>
          <Image
            style={styles.imageMethod}
            source={require('../../../assets/methods/bancolombia.jpg')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.method}>
        <TouchableOpacity onPress={pressMethod}>
          <Image
            style={styles.imageMethod}
            source={require('../../../assets/methods/nequi.jpg')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.method}>
        <TouchableOpacity onPress={pressMethod}>
          <Image
            style={styles.imageMethod}
            source={require('../../../assets/methods/daviplata.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.method}>
        <TouchableOpacity onPress={pressMethod}>
          <Image
            style={styles.imageMethod}
            source={require('../../../assets/methods/whatsapp.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Methods;

const styles = StyleSheet.create({
  methods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  method: {
    padding: 10,
    justifyContent: 'center',
  },
  containerScroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  imageMethod: {
    borderRadius: 100,
    width: 125,
    height: 125,
    backgroundColor: Colors.white,
  },
});
