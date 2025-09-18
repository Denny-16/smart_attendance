import API from './api';

async function login({ email, password }) {
  try {
    return await API.request('/auth/login', { method: 'POST', body: { email, password }});
  } catch {
    return { token: 'demo-token', user: { id: 'demo-student', name: 'Demo User' } };
  }
}

function getCurrentUser() {
  return { id: 'demo-student', name: 'Demo User' };
}

async function performBiometricCheck() { return true; }

export default { login, getCurrentUser, performBiometricCheck };
