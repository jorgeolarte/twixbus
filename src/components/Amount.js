import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import { setAmount } from '../reducers/user';
import { firebase } from '../utils/Firebase';
import { Typography, Colors } from '../styles';

const Amount = ({ user, setAmount }) => {
  useEffect(() => {
    const loadAmount = () => {
      firebase
        .database()
        .ref(`/users/${user.userUid}/amount`)
        .on('value', (snapshot) => {
          if (snapshot.val() === null) {
            setAmount(0);
          } else {
            setAmount(snapshot.val());
          }
        });
    };
    return loadAmount();
  }, []);

  return <Text style={styles.text}>${user.amount}</Text>;
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => ({
  setAmount: (amount) => dispatch(setAmount(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Amount);

const styles = StyleSheet.create({
  text: {
    fontSize: Typography.types.menu,
    color: Colors.white,
    paddingHorizontal: 10,
  },
});
