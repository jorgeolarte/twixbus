import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { setName, setEmail } from '../reducers/user';
import { Colors, Typography } from '../styles';
import { firebase } from '../utils/Firebase';
import { MainButton } from '../components';
import { set } from 'react-native-reanimated';

const ProfileScreen = ({ navigation, user, setName, setEmail }) => {
  const [enable, setEnable] = useState(true);

  const disconnect = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    console.log('name: ', user);
  }, [user]);

  const updateUser = () => {
    let dbuser = firebase.auth().currentUser;

    dbuser
      .updateProfile({
        displayName: user.name,
      })
      .then(function () {
        // Update successful.
        console.log('nombre actauluzado');
      })
      .catch(function (error) {
        // An error happened.
        console.log('error: ', error);
      });

    firebase.database().ref(`users/${user.userUid}`).update({
      name: user.name,
      email: user.email,
    });
  };

  const emailValidation = () => {
    console.log(user.email);
    let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
    if (reg.test(String(user.email).toLowerCase()) === false) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/profile.png')}
        resizeMode='center'
      />
      <View style={styles.profileContainer}>
        <Text style={styles.heading}>Tu perfil</Text>
        <Text style={styles.subheading}>Actualiza tus datos</Text>
        <TextInput
          style={styles.input}
          autoCapitalize='words'
          autoCompleteType='name'
          placeholder='Nombre completo'
          onChangeText={setName}
          defaultValue={user.name}
        />
        <TextInput
          style={styles.input}
          autoCompleteType='email'
          placeholder='Correo electrónico'
          onChangeText={setEmail}
          defaultValue={user.email}
          onEndEditing={emailValidation}
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
          disabled={enable}
          text='Actualizar perfil'
          onPress={updateUser}
        />
        <Button
          title='Cerrar sesión'
          color={Colors.danger}
          onPress={disconnect}
        />
      </View>
    </View>
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
});
