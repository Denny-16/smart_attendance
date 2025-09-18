// app/teacher/index.js (canary test)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TeacherIndexTest() {
  return (
    <View style={s.container}>
      <Text style={s.title}>Teacher index — test OK ✅</Text>
      <Text style={s.sub}>If you see this, the route works.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#fff' },
  title: { fontSize:22, fontWeight:'700', marginBottom:6 },
  sub: { color:'#666' }
});
