// app/index.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import PrimaryButton from "../components/PrimaryButton";

export default function HomeChooser() {
  return (
    <View style={s.container}>
      <Text style={s.title}>Choose your role</Text>
      <Link href="/student" asChild>
        <PrimaryButton title="I am Student (Kalyan)" />
      </Link>
      <Link href="/teacher" asChild>
        <PrimaryButton title="I am Teacher (Denny)" />
      </Link>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 30 }
});
