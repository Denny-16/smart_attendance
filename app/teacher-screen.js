// app/teacher-screen.js
import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import BLEService from "../services/bleService";
import AttendanceService from "../services/attendanceService";
import { useRouter } from "expo-router";

export default function TeacherScreen() {
  const [running, setRunning] = useState(false);
  const [classId, setClassId] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef(null);
  const router = useRouter();

  async function handleStartClass() {
    try {
      const res = await AttendanceService.startClass({
        teacherId: "denny", // teacher name hardcoded
        courseId: "CSE101",
      });
      const cid = res.classId || "demo-class";
      const token = res.sessionToken || generateToken(6);

      setClassId(cid);
      setSessionToken(token);
      setRunning(true);

      const duration = 20; // seconds
      setSecondsLeft(duration);

      BLEService.startBroadcast({ classId: cid, sessionToken: token });

      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            handleEndClass();
            return 0;
          }
          return s - 1;
        });
      }, 1000);

      Alert.alert("Class started", `Token: ${token}\nBroadcasting ${duration}s`);
    } catch (err) {
      Alert.alert("Start error", err.message || String(err));
    }
  }

  function handleEndClass() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    BLEService.stopBroadcast();
    setRunning(false);
    setClassId(null);
    setSessionToken(null);
    setSecondsLeft(0);
    Alert.alert("Class ended");
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Teacher — Start Class</Text>

      <View style={s.info}>
        <Text style={s.label}>Teacher</Text>
        <Text style={s.value}>Denny</Text>

        <Text style={[s.label, { marginTop: 12 }]}>Active class</Text>
        <Text style={s.value}>{classId ?? "None"}</Text>

        <Text style={[s.label, { marginTop: 12 }]}>Session token</Text>
        <Text style={s.value}>{sessionToken ?? "—"}</Text>

        <Text style={[s.label, { marginTop: 12 }]}>Broadcast</Text>
        <Text style={[s.value, { color: running ? "#0a74ff" : "#666" }]}>
          {running ? `Broadcasting — ${secondsLeft}s` : "Stopped"}
        </Text>
      </View>

      {!running ? (
        <PrimaryButton title="Start Class (generate token)" onPress={handleStartClass} />
      ) : (
        <PrimaryButton title="Stop Broadcast" onPress={handleEndClass} />
      )}

      <PrimaryButton
        title="View attendees (teacher/class page)"
        onPress={() => router.push("/teacher/class")}
      />
    </View>
  );
}

function generateToken(len = 6) {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  info: {
    backgroundColor: "#f6f7fb",
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
  },
  label: { color: "#666", fontSize: 13 },
  value: { fontSize: 18, fontWeight: "700", marginTop: 6 },
});
