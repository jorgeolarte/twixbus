import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { firebase } from '../utils/Firebase';
import { signIn, setPhone, setToken } from '../reducers/user';
import { MainButton, PressText } from '../components';
import { Colors, Typography } from '../styles';

const CodeScreen = ({ route, navigation, signIn, setPhone }) => {
  const headerHeight = useHeaderHeight();

  const [hasCode, setHasCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);

  const { phoneNumber, verificationId } = route.params;

  const validate = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      await firebase
        .auth()
        .signInWithCredential(credential)
        .then((confirmationResult) => {
          // console.log('confirmationResult: ', confirmationResult);
          setPhone(phoneNumber);
          // signIn(confirmationResult.user.uid);
        })
        .catch((err) => {
          console.log('error', err.message);

          Alert.alert(
            'Error de código',
            'El código de verificación de SMS que se usó para crear la credencial de autenticación del teléfono no es válido.'
          );
        });
      // console.log('Phone authentication successful 👍');
      // showMessage({ text: "Phone authentication successful 👍" });
    } catch (err) {
      console.log(`Error validate: ${err}`);
      // showMessage({ text: `Error: ${err.message}`, color: "red" });
    }
  };

  const onChangeCode = (code) => {
    setHasCode(String(code).length === 0 ? false : true);
    setVerificationCode(code);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container(headerHeight)}>
          <View style={styles.contentImage}>
            <Image
              style={styles.image}
              source={require('../../assets/validationCode.png')}
              resizeMode='center'
            />
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Verificar código</Text>
            <Text style={styles.paragraph}>
              Por favor digita el código de verificación enviado al teléfono{' '}
              <Text style={styles.phoneBold}>{phoneNumber}</Text>
            </Text>
            <View style={styles.codeContent}>
              <TextInput
                style={styles.validationNumber}
                placeholder='Código'
                textContentType='telephoneNumber'
                keyboardType='number-pad'
                onChangeText={(code) => onChangeCode(code)}
              />
              <MainButton
                text='Validar'
                disabled={hasCode}
                onPress={validate}
              />
              <PressText
                text='Cambiar número de teléfono'
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (userUid) => dispatch(signIn(userUid)),
  setPhone: (phone) => dispatch(setPhone(phone)),
  setToken: (token) => dispatch(setToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeScreen);

const styles = StyleSheet.create({
  container: (headerHeight) => ({
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'stretch',
    justifyContent: 'center',
  }),
  contentImage: {
    flex: 1,
    alignContent: 'stretch',
    justifyContent: 'center',
    backgroundColor: Colors.white, // #
    padding: 50,
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
  headerContent: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: Typography.heading,
    color: Colors.white,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: Typography.normal,
    color: Colors.white,
    textAlign: 'center',
    paddingHorizontal: 50,
    paddingBottom: 20,
  },
  phoneBold: {
    fontWeight: 'bold',
  },
  codeContent: {
    alignSelf: 'stretch',
    alignContent: 'center',
    paddingHorizontal: 50,
  },
  validationNumber: {
    backgroundColor: Colors.white,
    padding: 20,
    fontSize: Typography.heading,
    textAlign: 'center',
  },
  changePhone: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: Typography.small,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
});
