// services/authService.js
import API from "./api";

async function login({ email, password }) {
  try {
    const res = await API.request("/auth/login", { method: "POST", body: { email, password } });
    global.__AUTH_TOKEN = res.token;
    global.__CURRENT_USER = res.user;
    console.log("[Auth] logged in (backend)");
    return res;
  } catch (err) {
    // Demo fallback
    console.warn("[Auth] backend login failed — using demo fallback.", err.message);
    global.__AUTH_TOKEN = "demo-token";
    global.__CURRENT_USER = { id: "demo-student", name: "Demo Student", role: "student" };
    return { token: global.__AUTH_TOKEN, user: global.__CURRENT_USER };
  }
}

function getCurrentUser() {
  return global.__CURRENT_USER || { id: "demo-student", name: "Demo Student", role: "student" };
}

async function performBiometricCheck() {
  // Demo: always returns true. Replace with expo-local-authentication when ready.
  // Example real code (later):
  // import * as LocalAuthentication from 'expo-local-authentication';
  // const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Confirm identity' });
  // return result.success;
  console.log("[Auth] biometric check (demo) -> true");
  return true;
}

export default { login, getCurrentUser, performBiometricCheck };
