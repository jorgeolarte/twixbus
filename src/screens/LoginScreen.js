import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Video } from 'expo-av';
import LoginForm from '../components/LoginForm';
import { Logo } from '../components/';
import { firebase } from '../utils/Firebase';

const LoginScreen = ({ navigation, data }) => {
  const recaptchaVerifier = useRef(null);

  const [hasPhone, setHasPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState();

  const verify = async () => {
    try {
      firebase.auth().languageCode = 'es';
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      console.log('Verification code has been sent to your phone.');

      navigation.navigate('Code', {
        phoneNumber,
        verificationId,
      });
      //   showMessage({
      //     text: "Verification code has been sent to your phone.",
      //   });
    } catch (err) {
      console.log(`Error: ${err.message}`);
      //   showMessage({ text: `Error: ${err.message}`, color: "red" });
    }
  };

  const onChangePhone = (phone) => {
    setHasPhone(String(phone).length === 0 ? false : true);
    setPhoneNumber(`+57${phone}`);
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/busLogin.mp4')}
        style={styles.backgroundVideo}
        isMuted={false}
        resizeMode='cover'
        shouldPlay
        isLooping
      />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        title='Eres un humano!'
        firebaseConfig={firebase.app().options}
        cancelLabel='Cerrar'
      />
      <Logo
        flex={2}
        justifyContent='center'
        image={require('../../assets/twixbus-1024x539.png')}
      />
      <LoginForm
        phoneNumber={phoneNumber}
        hasPhone={hasPhone}
        setHasPhone={() => setHasPhone(!hasPhone)}
        verify={verify}
        onChangeText={(phone) => onChangePhone(phone)}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { data: state.user };
};

export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
  backgroundVideo: {
    // height: 500,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(102, 45, 145, 1)', // #

    alignItems: 'stretch',
    padding: 20,
  },
});
