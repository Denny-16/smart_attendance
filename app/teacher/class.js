// app/teacher/class.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from "react-native";
import AttendanceService from "../../services/attendanceService";

export default function TeacherClass() {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeClassId, setActiveClassId] = useState(null);

  async function poll() {
    setLoading(true);
    try {
      // 🔹 get active classId dynamically
      const cid = await AttendanceService.getActiveClassId();
      setActiveClassId(cid);

      if (!cid) {
        setAttendees([]);
        return;
      }

      const res = await AttendanceService.getAttendees({ classId: cid });
      setAttendees(res.present || []);
    } catch (err) {
      // ignore for demo
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    poll();
    const id = setInterval(() => {
      if (!mounted) return;
      poll();
    }, 2000); // poll every 2s

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.title}>Students Present</Text>
      {activeClassId ? (
        <Text style={s.subTitle}>Class ID: {activeClassId}</Text>
      ) : (
        <Text style={s.subTitle}>No active class</Text>
      )}

      <FlatList
        data={attendees}
        keyExtractor={(i) => i.studentId}
        renderItem={({ item }) => (
          <View style={s.row}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>
                {(item.name || "U").slice(0, 1).toUpperCase()}
              </Text>
            </View>

            <View style={s.info}>
              <Text style={s.name}>{item.name || item.studentId}</Text>
              <Text style={s.meta}>{item.email || "—"}</Text>
            </View>

            <View style={s.metaRight}>
              <Text style={s.method}>{item.method}</Text>
              <Text style={s.time}>
                {item.at ? new Date(item.at).toLocaleTimeString() : "-"}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ padding: 16, color: "#666" }}>
            No attendees yet
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={poll} />
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  subTitle: { fontSize: 14, color: "#666", marginBottom: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fafafa",
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e6f0ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { color: "#0a74ff", fontWeight: "800" },
  info: { flex: 1 },
  name: { fontWeight: "700", fontSize: 16 },
  meta: { color: "#666", marginTop: 4 },
  metaRight: { alignItems: "flex-end" },
  method: { color: "#0a74ff", fontWeight: "700" },
  time: { color: "#666", marginTop: 6 },
});
