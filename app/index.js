import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../styles/theme';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function StudentHome() {
  const router = useRouter();

  return (
    <ScrollView style={s.page} contentContainerStyle={s.container}>
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Welcome back,</Text>
          <Text style={s.name}>John Doe</Text>
        </View>
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={s.avatar} />
      </View>

      <View style={s.heroCard}>
        <View style={s.heroRow}>
          <View>
            <Text style={s.heroTitle}>Attendance Today</Text>
            <Text style={s.heroPercent}>85%</Text>
            <Text style={s.heroSub}>Good — keep attending regularly!</Text>
          </View>

          <View style={s.heroCircle}>
            <Text style={s.circleNumber}>85%</Text>
          </View>
        </View>

        <View style={s.kpis}>
          <View style={s.kpi}>
            <FontAwesome5 name="book" size={18} color={colors.primary} />
            <Text style={s.kpiLabel}>Classes</Text>
            <Text style={s.kpiValue}>4</Text>
          </View>
          <View style={s.kpi}>
            <MaterialIcons name="verified" size={18} color="#16a34a" />
            <Text style={s.kpiLabel}>Marked</Text>
            <Text style={s.kpiValue}>3</Text>
          </View>
          <View style={s.kpi}>
            <MaterialIcons name="schedule" size={18} color={colors.muted} />
            <Text style={s.kpiLabel}>Next</Text>
            <Text style={s.kpiValue}>10:00 AM</Text>
          </View>
        </View>
      </View>

      <View style={s.actions}>
        <PrimaryButton title="Join Class (Student)" onPress={() => router.push('/student/class')} />
        <PrimaryButton title="Start Class (Teacher)" onPress={() => router.push('/teacher/index')} />
        <Link href="/modal" style={{ width: '100%' }}>
          <View style={s.linkButton}>
            <Text style={s.linkText}>Open Demo Modal</Text>
          </View>
        </Link>
      </View>

      <View style={s.infoCard}>
        <Text style={s.infoTitle}>How it works</Text>
        <Text style={s.infoText}>
          TrackON uses BLE tokens + biometric checks to stop proxies and ensure genuine attendance.
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { backgroundColor: colors.bg },
  container: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  greeting: { color: colors.muted, fontSize: 14 },
  name: { fontSize: 20, fontWeight: '800', color: colors.text },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#eee' },

  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    marginBottom: 16,
  },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroTitle: { fontSize: 14, color: colors.muted },
  heroPercent: { fontSize: 36, fontWeight: '800', color: colors.primary, marginTop: 6 },
  heroSub: { marginTop: 6, color: colors.muted },

  heroCircle: {
    width: 86, height: 86, borderRadius: 43,
    borderWidth: 6, borderColor: '#dbeafe',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f8fbff'
  },
  circleNumber: { fontSize: 18, fontWeight: '800', color: colors.primary },

  kpis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  kpi: { alignItems: 'center', flex: 1 },
  kpiLabel: { fontSize: 12, color: colors.muted, marginTop: 6 },
  kpiValue: { fontSize: 16, fontWeight: '700', marginTop: 2 },

  actions: { marginTop: 10 },
  linkButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  linkText: { color: colors.primary, fontWeight: '700' },

  infoCard: {
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  infoTitle: { fontWeight: '800', fontSize: 16, marginBottom: 8 },
  infoText: { color: colors.muted, lineHeight: 20 },
});
