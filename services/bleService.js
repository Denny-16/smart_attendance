let scanCallback = null;

function startScan(cb) {
  scanCallback = cb;
  setTimeout(() => cb({ classId: 'demo-class', sessionToken: 'demo-token' }), 2000);
}
function stopScan() { scanCallback = null; }
function startBroadcast(info) { console.log('Broadcasting', info); }
function stopBroadcast() { console.log('Stopped broadcasting'); }

export default { startScan, stopScan, startBroadcast, stopBroadcast };
