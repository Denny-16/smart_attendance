// services/attendanceService.js
const fakeDB = { classes: {}, activeClassId: null };

function now() {
  return Date.now();
}

function normalizeStudent(student) {
  if (!student) return { studentId: "unknown", name: "Unknown" };
  if (typeof student === "string") return { studentId: student, name: student };
  return {
    studentId: student.id || student.studentId || "unknown",
    name: student.name || student.fullName || student.studentId || "Student",
    email: student.email || "",
  };
}

function generateId(prefix = "cls") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export default {
  async startClass({ teacherId, courseId } = {}) {
    await delay(120);
    const classId = generateId();
    const sessionToken = Math.random().toString(36).slice(2, 8).toUpperCase();
    fakeDB.classes[classId] = {
      sessionToken,
      startedAt: now(),
      present: [],
      teacherId,
      courseId,
    };
    fakeDB.activeClassId = classId; // ✅ save last started class globally
    return { classId, sessionToken };
  },

  async getActiveClassId() {
    return fakeDB.activeClassId;
  },

  async validateToken({ classId, sessionToken } = {}) {
    await delay(60);
    const cls = fakeDB.classes[classId];
    if (!cls) return false;
    return cls.sessionToken === sessionToken;
  },

  async markAttendance({ classId, student, studentId, method = "manual" } = {}) {
    await delay(60);
    const st = student
      ? normalizeStudent(student)
      : normalizeStudent(studentId);

    if (!fakeDB.classes[classId]) {
      fakeDB.classes[classId] = { sessionToken: null, present: [] };
    }
    const arr = fakeDB.classes[classId].present;

    const attendee = {
      studentId: st.studentId,
      name: st.name,
      email: st.email,
      method,
      at: now(),
    };

    // replace if already exists
    const existingIndex = arr.findIndex((x) => x.studentId === st.studentId);
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
    const list = (cls.present || [])
      .slice()
      .sort((a, b) => (b.at || 0) - (a.at || 0));
    return { present: list };
  },
};

function delay(ms = 100) {
  return new Promise((res) => setTimeout(res, ms));
}
