import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { QR } from '../components';

const ScannerScreen = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // let unsubscribe = true;

    const onFocus = () => {
      navigation.addListener('focus', () => {
        setIsFocused(true);
      });
    };

    const onBlur = () => {
      navigation.addListener('blur', () => {
        setIsFocused(false);
      });
    };

    onFocus();
    onBlur();
  }, [navigation]);

  if (!isFocused) {
    return (
      <View contentContainerStyle={styles.container} style={styles.spinner}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return <QR />;
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
