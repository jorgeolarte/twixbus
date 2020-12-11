import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Typography } from '../styles';
import Methods from './methods';

const Recharge = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingAmount}>
        <Text
          style={[
            styles.heading,
            data.amount === 0 ? styles.dangerAmount : styles.successAmount,
          ]}
        >
          ${data.amount}
        </Text>
        <Text style={styles.subheading}>Tu saldo actual</Text>
      </View>
      <View style={styles.methodsContainer}>
        <Text style={styles.subheading}>Recarga tu cuenta usando</Text>
        <Methods />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { data: state.user };
};

export default connect(mapStateToProps)(Recharge);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // #
    // alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  headingAmount: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  subheading: {
    fontSize: Typography.normal,
    color: Colors.dark,
    textAlign: 'center',
    paddingBottom: 10,
  },
  heading: {
    fontSize: Typography.hyperheading,
    fontWeight: 'bold',
    color: Colors.dark,
    textAlign: 'center',
  },
  dangerAmount: {
    color: Colors.danger,
  },
  successAmount: {
    color: Colors.secondary,
  },
  methodsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
  },
  methods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
