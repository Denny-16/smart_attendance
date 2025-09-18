import React from "react";
import { Slot } from "expo-router";
import { View, StyleSheet, StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />
      <Slot />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" }
});
