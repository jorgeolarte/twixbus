import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  ScrollView,
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { setName, setEmail, setBirthdate } from '../reducers/user';
import { Colors, Typography } from '../styles';
import { firebase } from '../utils/Firebase';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MainButton } from '../components';
import { DateTime } from 'luxon';
import Constants from 'expo-constants';

const ProfileScreen = ({
  navigation,
  user,
  setName,
  setEmail,
  setBirthdate,
}) => {
  const [date, setDate] = useState(new Date(1577880001000));
  const [showBirthdate, setShowBirthdate] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      birthdate: typeof user.birthdate === 'undefined' ? 0 : user.birthdate,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Requerido *')
        .min(3, 'Ingresa al menos 3 caracteres'),
      email: Yup.string().email('Correo invalido').required('Requerido *'),
      birthdate: Yup.number('Ingrese una fecha').required('Requerido *'),
    }),
    onSubmit: (data) => update(data),
  });

  const update = async (data) => {
    setName(data.name);
    setEmail(data.email);
    setBirthdate(data.birthdate);

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

    let newAmount = tempIsNew ? user.amount + 1700 : user.amount;

    firebase.database().ref(`users/${user.userUid}`).update({
      name: data.name,
      email: data.email,
      birthdate: data.birthdate,
      isNew: false,
      amount: newAmount,
    });

    if (tempIsNew) {
      Alert.alert(
        'Felicitaciones',
        'Has actualizado tus datos y te hemos obsequiado un viaje totalmente GRATIS',
        [
          {
            text: 'Usar ya mismo ????',
            onPress: () => navigation.navigate('QRStack'),
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  };

  const onChangeBithdate = (event, selectedDate) => {
    const currentDate = Date.parse(selectedDate || date);
    setShowBirthdate(false);
    setDate(currentDate);
    formik.setFieldTouched('birthdate');
    formik.setFieldValue('birthdate', currentDate);
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
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.containerScroll}
        >
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
              placeholder='Correo electr??nico'
              onChangeText={formik.handleChange('email')}
              value={formik.values.email}
              defaultValue={user.email}
              onBlur={formik.handleBlur('email')}
            />
            {formik.errors.birthdate && formik.touched.birthdate ? (
              <Text style={styles.error}>{formik.errors.birthdate}</Text>
            ) : null}
            <Text style={styles.input} onPress={() => setShowBirthdate(true)}>
              {formik.touched.birthdate === 'undefined' ||
              formik.values.birthdate === 0
                ? 'Fecha de cumplea??os'
                : DateTime.fromMillis(formik.values.birthdate).toLocaleString(
                    DateTime.DATE_SHORT
                  )}
            </Text>
            {showBirthdate ? (
              <DateTimePicker
                value={date}
                mode='date'
                display='spinner'
                maximumDate={Date.now()}
                onChange={onChangeBithdate}
                locale='es-ES'
              />
            ) : null}
            <MainButton
              disabled={true}
              text='Actualizar perfil'
              onPress={formik.handleSubmit}
            />
            <Button
              title='Cerrar sesi??n'
              color={Colors.danger}
              onPress={disconnect}
            />
            <Text style={styles.version}>
              Twixbus: {Constants.manifest.version}
            </Text>
          </View>
        </ScrollView>
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
  setBirthdate: (birthdate) => dispatch(setBirthdate(birthdate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  containerScroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  image: {
    marginVertical: 20,
    // flex: 1,
    height: 200,
    alignSelf: 'center',
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
    // flex: 1,
    fontSize: Typography.normal,
    padding: 10,
    backgroundColor: Colors.disabled,
    marginBottom: 20,
  },
  birthdateInput: {
    flex: 1,
    fontSize: Typography.normal,
    padding: 10,
    backgroundColor: Colors.disabled,
    // marginBottom: 20,
  },
  error: {
    fontSize: Typography.small,
    color: Colors.danger,
  },
  version: {
    paddingTop: 10,
    fontSize: 10,
    textAlign: 'center',
  },
});
