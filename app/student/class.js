import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import BLEService from '../../services/bleService';
import AttendanceService from '../../services/attendanceService';
import AuthService from '../../services/authService';

export default function StudentClass() {
  const [status, setStatus] = useState('Waiting for class token...');

  useEffect(() => {
    BLEService.startScan(async (tokenObj) => {
      setStatus('Token received — validating...');
      const user = AuthService.getCurrentUser();
      const valid = await AttendanceService.validateToken({ ...tokenObj, studentId: user.id });
      if (!valid) return setStatus('Invalid token');
      setStatus('Token valid — biometric check...');
      const bioOk = await AuthService.performBiometricCheck({ userId: user.id });
      if (!bioOk) return Alert.alert('Biometric failed');
      await AttendanceService.markAttendance({ ...tokenObj, studentId: user.id, method: 'ble+bio' });
      setStatus('Attendance marked ✅');
    });
    return () => BLEService.stopScan();
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.title}>Class Attendance</Text>
      <Text>{status}</Text>
      <PrimaryButton title="Force Mark (debug)" onPress={() => setStatus('Marked manually ✅')} />
    </View>
  );
}

const s = StyleSheet.create({ container:{flex:1,justifyContent:'center',alignItems:'center'}, title:{fontSize:18,fontWeight:'700'} });
