// services/attendanceService.js
import API from "./api";

/**
 * startClass: ask backend to start session. Fallback returns demo class.
 * returns { classId, sessionToken, ttl }
 */
async function startClass({ teacherId = "demo-teacher", courseId = "CSE101" } = {}) {
  try {
    const res = await API.request("/classes/start", { method: "POST", body: { teacherId, courseId }, token: global.__AUTH_TOKEN });
    console.log("[Attendance] startClass backend ->", res);
    return res;
  } catch (err) {
    console.warn("[Attendance] backend startClass failed, using demo fallback.", err.message);
    return { classId: "demo-class", sessionToken: "demo-token", ttl: 300 };
  }
}

/**
 * validateToken: backend validates session token. Fallback: demo-token valid.
 * returns boolean or object with { valid: true/false }
 */
async function validateToken({ classId, sessionToken, studentId }) {
  try {
    const res = await API.request("/classes/token/validate", { method: "POST", body: { classId, sessionToken, studentId }, token: global.__AUTH_TOKEN });
    console.log("[Attendance] validateToken backend ->", res);
    return !!(res && (res.valid === true));
  } catch (err) {
    console.warn("[Attendance] validateToken backend failed -> fallback", err.message);
    return sessionToken === "demo-token";
  }
}

/**
 * markAttendance: ask backend to mark attendance. Fallback returns demo success.
 */
async function markAttendance({ classId, studentId, method = "ble+biometric" } = {}) {
  try {
    const res = await API.request("/attendance/mark", { method: "POST", body: { classId, studentId, method }, token: global.__AUTH_TOKEN });
    console.log("[Attendance] markAttendance backend ->", res);
    return res;
  } catch (err) {
    console.warn("[Attendance] markAttendance backend failed -> fallback", err.message);
    return { marked: true, attendanceId: `demo-${Date.now()}` };
  }
}

/**
 * getAttendees: fetch attendees list. Fallback returns demo list.
 * returns { present: [ { studentId, name, markedAt, method }, ... ] }
 */
async function getAttendees({ classId } = {}) {
  try {
    const res = await API.request(`/classes/${classId}/attendees`, { method: "GET", token: global.__AUTH_TOKEN });
    console.log("[Attendance] getAttendees backend ->", res);
    return res;
  } catch (err) {
    console.warn("[Attendance] getAttendees backend failed -> fallback", err.message);
    return {
      present: [
        { studentId: "s1", name: "Alice Johnson", markedAt: new Date().toISOString(), method: "ble+biometric" },
        { studentId: "s2", name: "Bob Smith", markedAt: new Date().toISOString(), method: "ble+biometric" }
      ]
    };
  }
}

export default { startClass, validateToken, markAttendance, getAttendees };
