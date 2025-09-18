import API from './api';

async function startClass() { return { classId: 'demo-class', sessionToken: 'demo-token' }; }
async function validateToken() { return true; }
async function markAttendance() { return { ok: true }; }
async function getAttendees() { return { present:[{name:'Alice'},{name:'Bob'}] }; }

export default { startClass, validateToken, markAttendance, getAttendees };
