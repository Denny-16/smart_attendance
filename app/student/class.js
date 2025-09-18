// app/student/class.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import BLEService from "../../services/bleService";
import AttendanceService from "../../services/attendanceService";
import AuthService from "../../services/authService";

export default function StudentClass() {
  const [status, setStatus] = useState("Waiting for class token...");
  const [sessionInfo, setSessionInfo] = useState(null);
  const [manualToken, setManualToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    BLEService.startScan((tokenObj) => {
      if (!tokenObj) return;
      setSessionInfo(tokenObj);
      setStatus("Token received — validate to mark attendance");
    });

    return () => BLEService.stopScan();
  }, []);

  async function validateAndMark(tokenObj) {
    if (!tokenObj || !tokenObj.classId) {
      Alert.alert("No token", "No class token available to validate.");
      return;
    }
    setLoading(true);
    setStatus("Validating token...");
    try {
      const valid = await AttendanceService.validateToken({
        classId: tokenObj.classId,
        sessionToken: tokenObj.sessionToken,
      });

      if (!valid) {
        setStatus("Invalid token ❌");
        Alert.alert("Invalid token", "The token is not valid for this class.");
        setLoading(false);
        return;
      }

      setStatus("Token valid — running biometric check...");
      const user = AuthService.getCurrentUser();
      const bioOk = await AuthService.performBiometricCheck({ userId: user.id });
      if (!bioOk) {
        setStatus("Biometric failed ❌");
        Alert.alert("Biometric check failed");
        setLoading(false);
        return;
      }

      // IMPORTANT: pass the full student object so teacher sees names
      await AttendanceService.markAttendance({
        classId: tokenObj.classId,
        student: { id: user.id, name: user.name, email: user.email },
        method: "ble+biometric",
      });

      setStatus("Attendance marked ✅");
      Alert.alert("Success", "Attendance recorded.");
    } catch (err) {
      Alert.alert("Error", err.message || String(err));
      setStatus("Error validating token");
    } finally {
      setLoading(false);
    }
  }

  async function handleManualValidate() {
    if (!manualToken.trim()) {
      Alert.alert("Enter token", "Please enter the token provided by the teacher.");
      return;
    }
    const tokenObj = sessionInfo ?? { classId: "demo-class", sessionToken: manualToken.trim() };
    await validateAndMark(tokenObj);
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Class Attendance</Text>
      <Text style={s.status}>{status}</Text>

      {sessionInfo && (
        <View style={s.tokenBox}>
          <Text style={s.tokenLabel}>Token found</Text>
          <Text style={s.tokenValue}>{sessionInfo.sessionToken}</Text>
          <PrimaryButton title={loading ? "Verifying..." : "Validate token"} onPress={() => validateAndMark(sessionInfo)} disabled={loading} />
        </View>
      )}

      <Text style={{ color: "#666", marginTop: 12 }}>Or enter token manually</Text>
      <TextInput value={manualToken} onChangeText={setManualToken} placeholder="Enter token" style={s.input} autoCapitalize="characters" />
      <PrimaryButton title="Validate token (manual)" onPress={handleManualValidate} disabled={loading} />

      <View style={{ height: 20 }} />
      <PrimaryButton
        title="Force Mark (debug)"
        onPress={async () => {
          const user = AuthService.getCurrentUser();
          await AttendanceService.markAttendance({ classId: "demo-class", student: { id: user.id, name: user.name }, method: "manual+biometric" });
          setStatus("Attendance marked (manual) ✅");
          Alert.alert("Marked (debug)");
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "flex-start", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  status: { marginVertical: 12, fontSize: 16 },
  tokenBox: { backgroundColor: "#f2fbff", borderRadius: 10, padding: 12, marginBottom: 8 },
  tokenLabel: { color: "#0666c8", fontWeight: "700" },
  tokenValue: { fontSize: 22, fontWeight: "800", marginVertical: 8, color: "#0a74ff" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 8, marginTop: 8 }
});
