// services/attendanceService.js
// Simple in-memory demo "backend" for attendance.
// Replaces previous version with more structured attendee objects.

const fakeDB = { classes: {} };

function now() {
  return Date.now();
}

function normalizeStudent(student) {
  // student may be { id, name, email } or just id
  if (!student) return { studentId: "unknown", name: "Unknown" };
  if (typeof student === "string") return { studentId: student, name: student };
  return { studentId: student.id || student.studentId || "unknown", name: student.name || student.fullName || student.studentId || "Student", email: student.email || "" };
}

function generateId(prefix = "cls") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export default {
  async startClass({ teacherId, courseId } = {}) {
    await delay(120);
    const classId = generateId();
    const sessionToken = Math.random().toString(36).slice(2, 8).toUpperCase();
    fakeDB.classes[classId] = { sessionToken, startedAt: now(), present: [] , teacherId, courseId};
    return { classId, sessionToken };
  },

  async validateToken({ classId, sessionToken } = {}) {
    await delay(60);
    const cls = fakeDB.classes[classId];
    if (!cls) return false;
    return cls.sessionToken === sessionToken;
  },

  async markAttendance({ classId, student, studentId, method = "manual" } = {}) {
    await delay(60);
    // accept either student object or studentId
    const st = student ? normalizeStudent(student) : normalizeStudent(studentId);
    if (!fakeDB.classes[classId]) {
      fakeDB.classes[classId] = { sessionToken: null, present: [] };
    }
    const arr = fakeDB.classes[classId].present;

    // ensure unique by studentId (replace if exists)
    const existingIndex = arr.findIndex((x) => x.studentId === st.studentId);
    const attendee = { studentId: st.studentId, name: st.name, email: st.email, method, at: now() };

    if (existingIndex >= 0) {
      arr[existingIndex] = attendee;
    } else {
      arr.push(attendee);
    }

    return { ok: true, attendee };
  },

  async getAttendees({ classId } = {}) {
    await delay(40);
    const cls = fakeDB.classes[classId] || { present: [] };
    // sort by arrival time (most recent first)
    const list = (cls.present || []).slice().sort((a,b)=> (b.at||0)-(a.at||0));
    return { present: list };
  }
};

function delay(ms = 100) { return new Promise((res) => setTimeout(res, ms)); }
