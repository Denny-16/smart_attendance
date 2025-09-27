import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import PrimaryButton from "../../components/PrimaryButton";
import { colors } from "../../styles/theme";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function StudentIndex() {
  const user = { name: "Kalyan" };

  return (
    <ScrollView style={s.page} contentContainerStyle={s.container}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Welcome back,</Text>
          <Text style={s.name}>{user.name}</Text>
        </View>
        <Image
  source={require("../../assets/kalyan.jpeg")} // 👈 add your friend’s photo here
  style={s.avatar}
  accessibilityLabel="Profile picture"
/>

      </View>

      {/* Hero card */}
      <View style={s.heroCard}>
        <View style={s.heroLeft}>
          <Text style={s.heroTitle}>Attendance Today</Text>
          <Text style={s.heroPercent}>85%</Text>
          <Text style={s.heroSub}>Good — keep attending regularly!</Text>
        </View>
        <View style={s.heroCircle}>
          <Text style={s.circleNumber}>85%</Text>
        </View>
      </View>

      {/* KPI Row */}
      <View style={s.kpiRow}>
        <View style={s.kpiCard}>
          <FontAwesome5 name="book" size={20} color={colors.primary} />
          <Text style={s.kpiLabel}>Classes</Text>
          <Text style={s.kpiValue}>3</Text>
        </View>
        <View style={s.kpiCard}>
          <MaterialIcons name="verified" size={20} color="#16a34a" />
          <Text style={s.kpiLabel}>Marked</Text>
          <Text style={s.kpiValue}>1</Text>
        </View>
        <View style={s.kpiCard}>
          <MaterialIcons name="schedule" size={20} color={colors.muted} />
          <Text style={s.kpiLabel}>Next</Text>
          <Text style={s.kpiValue}>11:00 AM</Text>
        </View>
      </View>

      {/* Join Class */}
      <View style={s.actions}>
        <Link href="/student/class" asChild>
          <PrimaryButton title="Join Class" />
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

  heroCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heroLeft: { flex: 1 },
  heroTitle: { fontSize: 14, color: colors.muted },
  heroPercent: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.primary,
    marginTop: 6,
  },
  heroSub: { marginTop: 6, color: colors.muted },
  heroCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 6,
    borderColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fbff",
  },
  circleNumber: { fontSize: 18, fontWeight: "800", color: colors.primary },

  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  kpiLabel: { fontSize: 12, color: colors.muted, marginTop: 4 },
  kpiValue: { fontSize: 16, fontWeight: "700", marginTop: 2 },

  actions: { marginTop: 10 },
});
