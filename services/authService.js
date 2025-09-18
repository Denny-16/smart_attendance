// services/authService.js
// Simple demo auth/biometric service used on student side.

const demoUser = { id: "student-001", name: "John Student", email: "student@example.com" };

export default {
  getCurrentUser() {
    return demoUser;
  },

  async login() {
    // placeholder if you implement login later
    return { ok: true, user: demoUser, token: "demo-token" };
  },

  async performBiometricCheck({ userId } = {}) {
    // simulate biometric check delay + success
    await delay(300);
    // Always succeed in demo. Replace with LocalAuthentication on device if required.
    return true;
  }
};

function delay(ms = 200) {
  return new Promise((res) => setTimeout(res, ms));
}
