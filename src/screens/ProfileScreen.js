import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View>
      <Text>Profile!</Text>
      <Button title='Regresar' onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
