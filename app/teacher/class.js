import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AttendanceService from '../../services/attendanceService';
import StudentListItem from '../../components/StudentListItem';

export default function TeacherClass() {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    setInterval(async () => {
      const res = await AttendanceService.getAttendees({ classId: 'demo-class' });
      setAttendees(res.present || []);
    }, 3000);
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.title}>Students Present</Text>
      <FlatList data={attendees} renderItem={({item}) => <StudentListItem student={item} />} />
    </View>
  );
}

const s = StyleSheet.create({ container:{flex:1,padding:16}, title:{fontSize:18,fontWeight:'700'} });
