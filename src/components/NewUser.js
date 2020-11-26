import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { setIsNew } from '../reducers/user';
import Firebase from '../utils/Firebase';

const NewUser = ({ navigation, user, setIsNew }) => {
  const [exist, setExist] = useState(false);

  const validateExist = () => {
    Firebase.database()
      .ref(`users/${user.userUid}/isNew`)
      .on('value', (snapshot) => {
        let temp = snapshot.val();

        if (temp === null) {
          setIsNew(true);
        } else if (temp) {
          setIsNew(true);
        } else {
          setIsNew(false);
        }
      });
  };

  const userExist = () => {
    Firebase.database()
      .ref(`users/${user.userUid}`)
      .once('value')
      .then((snapshot) => {
        setExist(snapshot.exists());
      });
  };

  const createUser = () => {
    let newUser = {
      phoneNumber: user.phoneNumber,
      amount: user.amount,
      isNew: user.isNew,
    };
    Firebase.database().ref(`users/${user.userUid}`).set(newUser);
  };

  useEffect(() => {
    validateExist();
    userExist();
    if (!exist) {
      createUser();
    }
  }, []);

  return user.isNew ? (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor='rgba(31, 145, 76, 0.5)'
      style={styles.container}
      onPress={() => navigation.navigate('Profile', { screen: 'Profile' })}
    >
      <>
        <View>
          <Image
            source={require('../../assets/giftNewUser.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.contentMessage}>
          <Text style={styles.title}>Hola 😃</Text>
          <Text style={styles.text}>
            Completa tu información de usuario y recibe un viaje gratis
          </Text>
        </View>
      </>
    </TouchableHighlight>
  ) : null;
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => ({
  setIsNew: (isNew) => dispatch(setIsNew(isNew)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(31, 145, 76, 0.8)',
    marginBottom: 10,
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  contentMessage: {
    paddingLeft: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    // marginBottom: 10,
    paddingBottom: 2,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    // paddingHorizontal: 10,
  },
});
