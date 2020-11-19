import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import { setIsNew } from '../reducers/user';
import Firebase from '../utils/Firebase';

const NewUser = ({ user, setIsNew }) => {
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

  return user.isNew ? <Text style={styles.text}>Soy nuevo</Text> : null;
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => ({
  setIsNew: (isNew) => dispatch(setIsNew(isNew)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 10,
  },
});
