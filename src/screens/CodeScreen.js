import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import Firebase from '../utils/Firebase';
import { signIn, setPhone } from '../reducers/user';
import { MainButton, PressText } from '../components';

const CodeScreen = ({ route, navigation, signIn, setPhone }) => {
  const headerHeight = useHeaderHeight();

  const [hasCode, setHasCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);

  const { phoneNumber, verificationId } = route.params;

  const writeUserData = (userId, phone) => {
    // const { isNew, amount } = User(userId);
  };

  const validate = async () => {
    try {
      const credential = Firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      await Firebase.auth()
        .signInWithCredential(credential)
        .then((confirmationResult) => {
          console.log('el telefono es: ', phoneNumber);
          setPhone(phoneNumber);
          signIn(confirmationResult.user.uid);
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
    <View style={styles.container(headerHeight)}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Verificar código</Text>
        <Text style={styles.paragraph}>
          Por favor digita el código de verificación enviado al teléfono{' '}
          <Text style={styles.phoneBold}>{phoneNumber}</Text>
        </Text>
      </View>
      <View style={styles.codeContent}>
        <TextInput
          style={styles.validationNumber}
          placeholder='Código'
          textContentType='telephoneNumber'
          keyboardType='number-pad'
          onChangeText={(code) => onChangeCode(code)}
        />
        <MainButton text='Validar' disabled={hasCode} onPress={validate} />
        <PressText
          text='Cambiar número de teléfono'
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (userUid) => dispatch(signIn(userUid)),
  setPhone: (phone) => dispatch(setPhone(phone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeScreen);

const styles = StyleSheet.create({
  container: (headerHeight) => ({
    flex: 1,
    backgroundColor: 'rgba(102, 45, 145, 1)',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingVertical: headerHeight,
  }),
  headerContent: {
    // flex: 1,
    justifyContent: 'flex-end',
    // paddingTop: headerHeight,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 50,
    paddingBottom: 20,
  },
  phoneBold: {
    fontWeight: 'bold',
  },
  codeContent: {
    // flex: 3,
    // backgroundColor: '#000',
    marginVertical: 0,
    // alignItems: 'stretch',
    alignContent: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 50,
  },
  validationNumber: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 20,
    fontSize: 30,
    textAlign: 'center',
  },
  changePhone: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
});
