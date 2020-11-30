import React from 'react';
import { StyleSheet, TextInput, View, Text, Alert } from 'react-native';
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
        <TextInput
          style={styles.isoPhoneNumber}
          editable={false}
          disabled
          placeholder='+57'
          value='+57'
        />
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
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  isoPhoneNumber: {
    backgroundColor: Colors.disabled,
    fontSize: Typography.types.menu,
    padding: 20,
    textAlign: 'center',
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
});
