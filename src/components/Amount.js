import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import { setAmount } from '../reducers/user';
import { firebase } from '../utils/Firebase';
import { Typography, Colors } from '../styles';

const Amount = ({ user, setAmount }) => {
  return <Text style={styles.text}>${user.amount}</Text>;
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Amount);

const styles = StyleSheet.create({
  text: {
    fontSize: Typography.types.menu,
    color: Colors.white,
    paddingHorizontal: 10,
  },
});
