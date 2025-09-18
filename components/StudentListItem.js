import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StudentListItem({ student }) {
  return (
    <View style={s.row}>
      <Text style={s.name}>{student.name || 'Unknown'}</Text>
      <Text style={s.status}>{student.status || 'present'}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection:'row', justifyContent:'space-between', padding:12, borderBottomWidth:1, borderColor:'#eee' },
  name: { fontSize:16 },
  status: { color:'green', fontWeight:'700' }
});
