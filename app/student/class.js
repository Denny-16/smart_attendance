// app/student/class.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";

export default function StudentClass() {
  const [manualToken, setManualToken] = useState("");
  const [status, setStatus] = useState("Waiting to validate token...");

  // Hardcoded fixed token for demo
  const classId = "CSE101";
  const fixedToken = "ABC123";
  const student = {
    id: "kalyan01",
    name: "Kalyan",
    email: "kalyan@example.com",
  };

  function validateToken(tokenToCheck) {
    if (!tokenToCheck) {
      Alert.alert("Enter token", "Please enter a token.");
      return;
    }
    if (tokenToCheck !== fixedToken) {
      setStatus("Invalid token ❌");
      Alert.alert("Invalid token", "Token does not match.");
      return;
    }

    // Token valid → mark Kalyan
    setStatus("Token valid — marking attendance...");
    setTimeout(() => {
      setStatus("Attendance marked ✅");
      Alert.alert(
        "Success",
        `${student.name}'s attendance has been recorded for ${classId}`
      );
    }, 600);
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Join Class</Text>
      <Text style={s.subtitle}>Class ID: {classId}</Text>
      <Text style={{ marginTop: 10, color: "#666" }}>{status}</Text>

      {/* Auto token (same as teacher) */}
      <View style={s.tokenBox}>
        <Text style={s.tokenLabel}>Expected token</Text>
        <Text style={s.tokenValue}>{fixedToken}</Text>
        <PrimaryButton
          title="Validate shown token"
          onPress={() => validateToken(fixedToken)}
        />
      </View>

      {/* Manual input option */}
      <View style={{ marginTop: 16 }}>
        <Text style={{ color: "#666" }}>Or enter token manually</Text>
        <TextInput
          style={s.input}
          placeholder="Enter TOKEN"
          value={manualToken}
          onChangeText={setManualToken}
          autoCapitalize="characters"
        />
        <PrimaryButton
          title="Validate manual token"
          onPress={() => validateToken(manualToken.trim())}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700" },
  subtitle: { color: "#666", marginTop: 6 },
  tokenBox: {
    marginTop: 20,
    backgroundColor: "#f2fbff",
    padding: 14,
    borderRadius: 10,
  },
  tokenLabel: { color: "#0666c8", fontWeight: "700" },
  tokenValue: {
    fontSize: 22,
    fontWeight: "800",
    marginVertical: 8,
    color: "#0a74ff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
});
