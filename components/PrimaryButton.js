// components/PrimaryButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../styles/theme";

export default function PrimaryButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity style={[styles.btn, disabled && styles.disabled]} onPress={onPress} activeOpacity={0.8} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: colors.primary, paddingVertical: 12, paddingHorizontal: 22, borderRadius: 10, marginVertical: 8 },
  text: { color: "#fff", fontWeight: "700", fontSize: 16 },
  disabled: { opacity: 0.6 }
});
