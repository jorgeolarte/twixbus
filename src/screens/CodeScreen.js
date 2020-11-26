import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Alert, Image } from 'react-native';
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
          <MainButton text='Validar' disabled={hasCode} onPress={validate} />
          <PressText
            text='Cambiar número de teléfono'
            onPress={() => navigation.goBack()}
          />
        </View>
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
    // paddingVertical: headerHeight,
  }),
  contentImage: {
    flex: 1,
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
  headerContent: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    textAlign: 'center',
    // backgroundColor: '#000',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
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
    // backgroundColor: '#f00',
    // marginVertical: 0,
    alignSelf: 'stretch',
    alignContent: 'center',
    // justifyContent: 'flex-start',
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
