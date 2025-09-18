// services/bleService.js
let scanCallback = null;
let broadcastInterval = null;

/**
 * startScan(callback)
 * callback receives token object: { classId, sessionToken }
 * Demo: calls callback after 2s with demo token.
 */
function startScan(cb) {
  scanCallback = cb;
  console.log("[BLE] startScan (demo) - will deliver demo token in 2s");
  // simulate receiving token after 2s
  setTimeout(() => {
    if (scanCallback) {
      const tokenObj = { classId: "demo-class", sessionToken: "demo-token" };
      console.log("[BLE] demo token delivered:", tokenObj);
      try { scanCallback(tokenObj); } catch (e) { console.warn("[BLE] scan callback error", e); }
    }
  }, 2000);
}

/** stopScan */
function stopScan() {
  console.log("[BLE] stopScan (demo)");
  scanCallback = null;
}

/**
 * startBroadcast(sessionInfo)
 * sessionInfo = { classId, sessionToken, ttl? }
 * Demo: logs and periodically prints broadcast message.
 */
function startBroadcast(sessionInfo = { classId: "demo-class", sessionToken: "demo-token" }) {
  console.log("[BLE] startBroadcast (demo):", sessionInfo);
  if (broadcastInterval) clearInterval(broadcastInterval);
  broadcastInterval = setInterval(() => {
    console.log("[BLE] broadcasting token:", sessionInfo.sessionToken);
  }, 2000);
}

/** stopBroadcast */
function stopBroadcast() {
  if (broadcastInterval) {
    clearInterval(broadcastInterval);
    broadcastInterval = null;
  }
  console.log("[BLE] stopBroadcast (demo)");
}

export default { startScan, stopScan, startBroadcast, stopBroadcast };
