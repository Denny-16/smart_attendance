// app/teacher/class.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AttendanceService from "../../services/attendanceService";
import StudentListItem from "../../components/StudentListItem";

export default function TeacherClass() {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function poll() {
      try {
        const res = await AttendanceService.getAttendees({ classId: "demo-class" });
        if (!mounted) return;
        setAttendees(res.present || []);
      } catch (err) {
        console.warn("getAttendees error", err);
      }
    }
    poll();
    const id = setInterval(poll, 5000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.title}>Students Present</Text>
      <FlatList
        data={attendees}
        keyExtractor={(i) => i.studentId || Math.random().toString()}
        renderItem={({ item }) => <StudentListItem student={item} />}
        ListEmptyComponent={<Text style={{ padding: 16 }}>No attendees yet</Text>}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
});
