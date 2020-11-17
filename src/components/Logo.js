import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Logo = (props) => {
  return (
    <View style={styles.contentLogo(props.flex, props.justifyContent)}>
      <Image style={styles.logo} source={props.image} resizeMode='center' />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  contentLogo: (flex, justifyContent) => ({
    flex: flex,
    alignContent: 'stretch',
    justifyContent: justifyContent,
  }),
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
});
