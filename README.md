# 📱 Smart Attendance (TrackON)

A **Smart Attendance System** built using **React Native + Expo Router**.  
It simulates **teacher–student interaction** for attendance using tokens,  
biometric verification (mocked), and real-time attendee updates.

---

## 🚀 Features
### 👩‍🏫 Teacher
- **Start Class** → Generates a session token and broadcasts it for 20 seconds.  
- **Check Status** → Displays a live list of attendees with **name, email, method, and timestamp**.

### 👨‍🎓 Student
- **Join Class** → Receives or enters a session token.  
- **Validate Token** → Token checked, then biometric verification (mocked).  
- **Mark Attendance** → Attendance recorded with timestamp.

---

## 📂 Project Structure
my-app/
├── app/
│ ├── index.js # Home screen (student + teacher entry point)
│ ├── student/
│ │ └── class.js # Student: join/validate class
│ ├── teacher/
│ │ └── class.js # Teacher: check attendees
│ └── teacher-screen.js # Teacher: start class & token broadcast
├── components/
│ └── PrimaryButton.js # Reusable styled button
├── services/
│ ├── attendanceService.js
│ ├── authService.js
│ └── bleService.js
└── README.md



---

## ⚙️ Setup & Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/smart_attendance.git
   cd smart_attendance/my-app
2.Install dependencies
npm install

3.Install Expo dependencies
npx expo install expo-router react-native-safe-area-context react-native-gesture-handler react-native-reanimated


4.Run the app
npx expo start -c


5.Open in:

Expo Go (scan QR code)

