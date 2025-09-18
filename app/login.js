import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import AuthService from '../services/authService';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('pass');
  const router = useRouter();

  async function handleLogin() {
    try {
      const res = await AuthService.login({ email, password });
      if (res && res.token) {
        Alert.alert('Login success');
        router.replace('/');
      } else {
        Alert.alert('Login failed');
      }
    } catch (err) {
      Alert.alert('Error', err.message || String(err));
    }
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>TrackON — Login</Text>
      <TextInput style={s.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={s.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <PrimaryButton title="Login" onPress={handleLogin} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center', backgroundColor:'#fff' },
  title: { fontSize:22, fontWeight:'700', marginBottom:20, textAlign:'center' },
  input: { borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:8, marginBottom:12 }
});
