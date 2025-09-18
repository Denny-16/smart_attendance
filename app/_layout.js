// app/_layout.js
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import { Slot, Link, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";

function Header() {
  const segments = useSegments(); // route segments, useful to show title/back
  const current = segments[segments.length - 1] || "index";

  // Simple human-friendly title by route
  const titleMap = {
    index: "Dashboard",
    student: "Student",
    teacher: "Teacher",
    class: "Class",
    login: "Login",
  };

  const title = titleMap[current] ? titleMap[current] : titleMap[segments[0]] || "TrackON";

  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerLinks}>
          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Home</Text>
          </Link>
          <Link href="/login" style={styles.link}>
            <Text style={styles.linkText}>Login</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="auto" />
      <Header />
      <View style={styles.container}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6fafc" },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
    backgroundColor: "#fff",
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
  },
  headerInner: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
  headerLinks: { flexDirection: "row", alignItems: "center" },
  link: { marginLeft: 12 },
  linkText: { color: "#2563eb", fontWeight: "600" },

  container: { flex: 1, backgroundColor: "transparent" },
});
