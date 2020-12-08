import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { setName, setEmail } from '../reducers/user';
import { Colors, Typography } from '../styles';
import { firebase } from '../utils/Firebase';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MainButton } from '../components';

const ProfileScreen = ({ navigation, user, setName, setEmail }) => {
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Requerido *')
        .min(3, 'Ingresa al menos 3 caracteres'),
      email: Yup.string().email('Correo invalido').required('Requerido *'),
    }),
    onSubmit: (x) => update(x),
  });

  const update = async (data) => {
    setName(data.name);
    setEmail(data.email);

    let dbuser = firebase.auth().currentUser;

    dbuser
      .updateProfile({
        displayName: user.name,
      })
      .then(function () {
        console.log('nombre actualizado');
      })
      .catch(function (error) {
        console.log('error: ', error);
      });

    let tempIsNew = false;

    tempIsNew = await firebase
      .database()
      .ref(`users/${user.userUid}/isNew`)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });

    console.log('tempIsNew: ', tempIsNew);

    let newAmount = tempIsNew ? user.amount + 1700 : user.amount;

    firebase.database().ref(`users/${user.userUid}`).update({
      name: data.name,
      email: data.email,
      isNew: false,
      amount: newAmount,
    });

    if (tempIsNew) {
      Alert.alert(
        'Felicitaciones',
        'Has actualizado tus datos y te hemos obsequiado un viaje totalmente GRATIS',
        [
          {
            text: 'Usar ya mismo 😎',
            onPress: () => navigation.navigate('QRStack'),
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  };

  const disconnect = () => {
    firebase.auth().signOut();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../assets/profile.png')}
            resizeMode='center'
          />
          <View style={styles.profileContainer}>
            <Text style={styles.heading}>Tu perfil</Text>
            <Text style={styles.subheading}>Actualiza tus datos</Text>
            {formik.errors.name && formik.touched.name ? (
              <Text style={styles.error}>{formik.errors.name}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              autoCapitalize='words'
              autoCompleteType='name'
              placeholder='Nombre completo'
              onChangeText={formik.handleChange('name')}
              value={formik.values.name}
              defaultValue={user.name}
              onBlur={formik.handleBlur('name')}
            />
            {formik.errors.email && formik.touched.email ? (
              <Text style={styles.error}>{formik.errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              autoCompleteType='email'
              keyboardType='email-address'
              textContentType='emailAddress'
              placeholder='Correo electrónico'
              onChangeText={formik.handleChange('email')}
              value={formik.values.email}
              defaultValue={user.email}
              onBlur={formik.handleBlur('email')}
            />
            <TextInput
              style={styles.input}
              autoCompleteType='tel'
              textContentType='telephoneNumber'
              keyboardType='phone-pad'
              placeholder='Teléfono'
              editable={false}
              defaultValue={user.phoneNumber}
            />
            <MainButton
              disabled={true}
              text='Actualizar perfil'
              onPress={formik.handleSubmit}
            />
            <Button
              title='Cerrar sesión'
              color={Colors.danger}
              onPress={disconnect}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => ({
  setName: (name) => dispatch(setName(name)),
  setEmail: (email) => dispatch(setEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
  profileContainer: {
    flex: 2,
    // alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  heading: {
    fontSize: Typography.heading,
    fontWeight: 'bold',
    color: Colors.dark,
    textAlign: 'center',
    // paddingBottom: 20,
  },
  subheading: {
    fontSize: Typography.normal,
    color: Colors.dark,
    textAlign: 'center',
    paddingBottom: 20,
  },
  input: {
    fontSize: Typography.normal,
    padding: 10,
    backgroundColor: Colors.disabled,
    marginBottom: 20,
  },
  error: {
    fontSize: Typography.small,
    color: Colors.danger,
  },
});
