// components/StudentListItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StudentListItem({ student }) {
  if (!student) return null;
  return (
    <View style={s.row}>
      <View style={s.avatar}>{/* optional avatar circle */}</View>
      <View style={s.info}>
        <Text style={s.name}>{student.name || student.studentId}</Text>
        <Text style={s.meta}>{student.markedAt ? new Date(student.markedAt).toLocaleString() : student.method || ""}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: "row", padding: 12, alignItems: "center", borderBottomWidth: 1, borderColor: "#f0f0f0" },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#eee", marginRight: 12 },
  info: { flex: 1 },
  name: { fontWeight: "700" },
  meta: { color: "#666", marginTop: 4, fontSize: 12 }
});
