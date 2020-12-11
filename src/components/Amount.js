import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import { Typography, Colors } from '../styles';
import { useNavigation } from '@react-navigation/native';

const Amount = ({ user, setAmount }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Recharge');
  };

  return (
    <Text onPress={onPress} style={styles.text}>
      ${user.amount}
    </Text>
  );
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
