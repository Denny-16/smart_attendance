import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import PrimaryButton from "../../components/PrimaryButton";
import { colors } from "../../styles/theme";

const todayClasses = [
  { id: "1", title: "Data Structures", time: "09:00 AM", attendees: ["Kalyan"] },
  { id: "2", title: "Operating Systems", time: "11:00 AM", attendees: [] },
  { id: "3", title: "Networks", time: "02:00 PM", attendees: [] },
];

export default function TeacherIndex() {
  const teacher = { name: "Denny" };

  return (
    <ScrollView style={s.page} contentContainerStyle={s.container}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Welcome back,</Text>
          <Text style={s.name}>{teacher.name}</Text>
        </View>
        <Image
          source={require("../../assets/denny.jpeg")} // 👈 add your photo here
          style={s.avatar}
          accessibilityLabel="Profile picture"
        />
      </View>

      {/* Classes */}
      <Text style={s.sectionTitle}>{"Today's Classes"}</Text>
      <FlatList
        data={todayClasses}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={s.classCard}>
            <Text style={s.classTitle}>
              {item.time} - {item.title}
            </Text>
            <Text style={s.classSub}>
              Attended: {item.attendees.length > 0 ? item.attendees.join(", ") : "None"}
            </Text>
          </View>
        )}
      />

      {/* Actions */}
      <View style={s.actions}>
        <Link href="/teacher-screen" asChild>
          <PrimaryButton title="Start Class" />
        </Link>
        <Link href="/teacher/class" asChild>
          <PrimaryButton title="Check Status" />
        </Link>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { backgroundColor: colors.bg },
  container: { padding: 16, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  greeting: { color: colors.muted, fontSize: 14 },
  name: { fontSize: 20, fontWeight: "800", color: colors.text },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#eee" },

  sectionTitle: { fontSize: 16, fontWeight: "700", marginVertical: 10 },

  classCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  classTitle: { fontSize: 15, fontWeight: "700" },
  classSub: { color: "#666", marginTop: 4 },

  actions: { marginTop: 20 },
});
