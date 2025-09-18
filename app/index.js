// app/index.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../styles/theme";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function StudentHome() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={s.safe}>
      <ScrollView style={s.page} contentContainerStyle={s.container}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Welcome back,</Text>
            <Text style={s.name}>John Doe</Text>
          </View>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
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
            <Text style={s.kpiValue}>4</Text>
          </View>
          <View style={s.kpiCard}>
            <MaterialIcons name="verified" size={20} color="#16a34a" />
            <Text style={s.kpiLabel}>Marked</Text>
            <Text style={s.kpiValue}>3</Text>
          </View>
          <View style={s.kpiCard}>
            <MaterialIcons name="schedule" size={20} color={colors.muted} />
            <Text style={s.kpiLabel}>Next</Text>
            <Text style={s.kpiValue}>10:00 AM</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={s.actions}>
          <PrimaryButton
            title="Join Class (Student)"
            onPress={() => router.push("/student/class")}
          />
          <PrimaryButton
            title="Start Class (Teacher)"
            onPress={() => router.push("/teacher/index")}
          />
          <PrimaryButton
            title="Check status (Teacher)"
            onPress={() => router.push("/teacher/class")}
          />

          {/* Modal link styled like a button for consistent UI */}
          <Link href="/modal" asChild>
            <Pressable style={s.modalButton} android_ripple={{ color: "#eee" }}>
              <Text style={s.modalButtonText}>Open Demo Modal</Text>
            </Pressable>
          </Link>
        </View>

        {/* How it works */}
        <View style={s.infoCard}>
          <Text style={s.infoTitle}>How it works</Text>
          <Text style={s.infoText}>
            TrackON uses short-range BLE tokens broadcast by the teacher’s device and local biometric checks
            on students’ devices. This ensures attendance is genuine and proxy-free.
          </Text>

          {/* Badges */}
          <View style={s.badges}>
            <View style={s.badge}>
              <MaterialIcons name="security" size={18} color={colors.primary} />
              <Text style={s.badgeText}>Secure</Text>
            </View>
            <View style={s.badge}>
              <MaterialIcons name="speed" size={18} color={colors.primary} />
              <Text style={s.badgeText}>Fast</Text>
            </View>
            <View style={s.badge}>
              <MaterialIcons name="groups" size={18} color={colors.primary} />
              <Text style={s.badgeText}>No Proxies</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },

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
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
      },
    }),
    marginBottom: 16,
  },
  heroLeft: { flex: 1 },
  heroTitle: { fontSize: 14, color: colors.muted },
  heroPercent: { fontSize: 36, fontWeight: "800", color: colors.primary, marginTop: 6 },
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

  kpiRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
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

  // modal button made to match primary style but slightly lighter
  modalButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#eee",
    width: "100%",
  },
  modalButtonText: { color: colors.primary, fontWeight: "700" },

  infoCard: {
    marginTop: 18,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
      },
    }),
  },
  infoTitle: { fontWeight: "800", fontSize: 16, marginBottom: 8 },
  infoText: { color: colors.muted, lineHeight: 20 },

  badges: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  badge: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "#f6fbff",
  },
  badgeText: { marginLeft: 6, fontWeight: "600", color: colors.primary },
});
