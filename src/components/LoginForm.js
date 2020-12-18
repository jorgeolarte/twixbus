import React from 'react';
import { StyleSheet, TextInput, View, Text, Alert, Image } from 'react-native';
import { FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { MainButton, Terms } from './index';
import { Colors, Typography } from '../styles';

const LoginForm = (props) => {
  const validatePhoneNumber = () => {
    let regex = /^([+])([57]*)([3])\d{9}$/gm;
    let phone = props.phoneNumber;
    if (phone.match(regex) === null) {
      Alert.alert('Teléfono invalido', 'El número ingresado es invalido');
    } else {
      props.verify();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Ve a donde quieras!</Text>
      <View style={styles.contentPhone}>
        <View style={styles.isoContentNumber}>
          <Image
            source={require('../../assets/flagColombia.png')}
            style={styles.flag}
          />
          <Text style={styles.isoNumber}>+57</Text>
        </View>
        {/* <TextInput
          style={styles.isoPhoneNumber}
          editable={false}
          disabled
          placeholder='+57'
          value='+57'
        /> */}
        <TextInput
          style={styles.phoneNumber}
          placeholder='Número celular'
          autoCompleteType='tel'
          textContentType='telephoneNumber'
          keyboardType='phone-pad'
          maxLength={10}
          onChangeText={props.onChangeText}
        />
      </View>
      <MainButton
        disabled={props.hasPhone}
        text='Empecemos'
        onPress={validatePhoneNumber}
      />
      <Terms />
      <View style={styles.contentCaptcha}>
        <FirebaseRecaptchaBanner
          textStyle={styles.captchaHelpText}
          linkStyle={styles.captchaLink}
        />
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: Typography.normal,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  contentPhone: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  isoContentNumber: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: Colors.disabled,
    justifyContent: 'center',
    alignItems: 'center',
  },
  isoNumber: {
    paddingLeft: 5,
    fontSize: Typography.normal,
    color: Colors.dark,
    fontWeight: 'bold',
  },
  flag: {
    // marginHorizontal: 1,
    width: 25,
    height: 25,
  },
  phoneNumber: {
    flex: 1,
    backgroundColor: Colors.white,
    fontSize: Typography.types.menu,
    padding: 20,
    textAlign: 'center',
  },
  termsText: {
    fontSize: Typography.small,
    color: Colors.white,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  contentCaptcha: {
    marginBottom: 20,
  },
  captchaHelpText: {
    fontSize: 10,
    opacity: 1,
    textAlign: 'center',
    color: Colors.white,
  },
  captchaLink: {
    color: Colors.secondary,
    fontWeight: 'bold',
  },
});
