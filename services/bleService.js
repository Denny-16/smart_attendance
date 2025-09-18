// services/bleService.js
const BLE = {
  broadcasting: null,
  broadcastIntervalId: null,
  scanCallback: null,
};

export default {
  startBroadcast({ classId, sessionToken } = {}) {
    BLE.broadcasting = { classId, sessionToken };
    if (BLE.broadcastIntervalId) clearInterval(BLE.broadcastIntervalId);
    BLE.broadcastIntervalId = setInterval(() => {
      if (BLE.scanCallback && BLE.broadcasting) {
        BLE.scanCallback({ classId: BLE.broadcasting.classId, sessionToken: BLE.broadcasting.sessionToken });
      }
    }, 1500);
  },

  stopBroadcast() {
    BLE.broadcasting = null;
    if (BLE.broadcastIntervalId) {
      clearInterval(BLE.broadcastIntervalId);
      BLE.broadcastIntervalId = null;
    }
  },

  startScan(cb) {
    BLE.scanCallback = cb;
    if (BLE.broadcasting && BLE.scanCallback) {
      setTimeout(() => BLE.scanCallback({ classId: BLE.broadcasting.classId, sessionToken: BLE.broadcasting.sessionToken }), 300);
    }
  },

  stopScan() {
    BLE.scanCallback = null;
  },
};
