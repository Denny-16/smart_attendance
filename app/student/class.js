import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import BLEService from "../../services/bleService";
import AttendanceService from "../../services/attendanceService";
import AuthService from "../../services/authService";

export default function StudentClass() {
  const [status, setStatus] = useState("Waiting for class token...");
  const [sessionInfo, setSessionInfo] = useState(null);

  useEffect(() => {
    BLEService.startScan(async (tokenObj) => {
      setStatus("Token received — validating...");
      setSessionInfo(tokenObj);

      const user = AuthService.getCurrentUser();
      const valid = await AttendanceService.validateToken({
        classId: tokenObj.classId,
        sessionToken: tokenObj.sessionToken,
        studentId: user.id,
      });

      if (!valid) {
        setStatus("Invalid token ❌");
        return;
      }

      setStatus("Token valid — running biometric check...");
      const bioOk = await AuthService.performBiometricCheck({ userId: user.id });
      if (!bioOk) {
        setStatus("Biometric failed ❌");
        Alert.alert("Biometric check failed");
        return;
      }

      await AttendanceService.markAttendance({
        classId: tokenObj.classId,
        studentId: user.id,
        method: "ble+biometric",
      });
      setStatus("Attendance marked ✅");
    });

    return () => BLEService.stopScan();
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.title}>Class Attendance</Text>
      <Text style={s.status}>{status}</Text>

      <PrimaryButton
        title="Force Mark (debug)"
        onPress={async () => {
          const user = AuthService.getCurrentUser();
          const ok = await AuthService.performBiometricCheck({ userId: user.id });
          if (!ok) return Alert.alert("Biometric failed");
          await AttendanceService.markAttendance({
            classId: "demo-class",
            studentId: user.id,
            method: "manual+biometric",
          });
          setStatus("Attendance marked (manual) ✅");
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  status: { marginVertical: 20, fontSize: 16 },
});
