import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import BLEService from '../../services/bleService';
import AttendanceService from '../../services/attendanceService';
import { useRouter } from 'expo-router';

export default function TeacherHome() {
  const [running, setRunning] = useState(false);
  const [classId, setClassId] = useState(null);
  const router = useRouter();

  async function startClass() {
    const res = await AttendanceService.startClass({ teacherId: 't1', courseId: 'CSE101' });
    setClassId(res.classId);
    setRunning(true);
    BLEService.startBroadcast(res);
    Alert.alert('Class started');
  }
  function endClass() {
    setRunning(false); setClassId(null);
    BLEService.stopBroadcast(); Alert.alert('Class ended');
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Teacher Dashboard</Text>
      <Text>Active class: {classId || 'None'}</Text>
      {!running ? <PrimaryButton title="Start Class" onPress={startClass} /> : <PrimaryButton title="End Class" onPress={endClass} />}
      <PrimaryButton title="View Class" onPress={() => router.push('/teacher/class')} />
    </View>
  );
}

const s = StyleSheet.create({ container:{flex:1,alignItems:'center',justifyContent:'center'}, title:{fontSize:20,fontWeight:'700'} });
