import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl, Image } from "react-native";
import AttendanceService from "../../services/attendanceService";

export default function TeacherClass() {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);

  async function poll() {
    setLoading(true);
    try {
      const res = await AttendanceService.getAttendees({ classId: "demo-class" });
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
    }, 2000); // poll every 2s for near-real-time updates

    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.title}>Students Present</Text>

      <FlatList
        data={attendees}
        keyExtractor={(i) => i.studentId}
        renderItem={({ item }) => (
          <View style={s.row}>
            <View style={s.avatar}>
              {/* simple avatar initial circle */}
              <Text style={s.avatarText}>{(item.name || "U").slice(0,1).toUpperCase()}</Text>
            </View>

            <View style={s.info}>
              <Text style={s.name}>{item.name || item.studentId}</Text>
              <Text style={s.meta}>{item.email || "—"}</Text>
            </View>

            <View style={s.metaRight}>
              <Text style={s.method}>{item.method}</Text>
              <Text style={s.time}>{item.at ? new Date(item.at).toLocaleTimeString() : "-"}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ padding: 16, color: "#666" }}>No attendees yet</Text>}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={poll} />}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 10, backgroundColor: "#fafafa", marginBottom: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#e6f0ff", alignItems: "center", justifyContent: "center", marginRight: 12 },
  avatarText: { color: "#0a74ff", fontWeight: "800" },
  info: { flex: 1 },
  name: { fontWeight: "700", fontSize: 16 },
  meta: { color: "#666", marginTop: 4 },
  metaRight: { alignItems: "flex-end" },
  method: { color: "#0a74ff", fontWeight: "700" },
  time: { color: "#666", marginTop: 6 }
});
