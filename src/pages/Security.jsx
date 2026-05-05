import { useState } from "react";
import {
  createAccessLog,
  getSecurityAlerts,
  getSecurityLogs,
  validateAccess,
} from "../api/securityApi.js";

export default function Security() {
  const [deviceId, setDeviceId] = useState("");
  const [requestType, setRequestType] = useState("CONTROL");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  async function runAction(action) {
    try {
      const payload = { deviceId: Number(deviceId), requestType, allowed: true };
      let data;
      if (action === "validate") data = await validateAccess(payload);
      if (action === "log") data = await createAccessLog(payload);
      if (action === "logs") data = await getSecurityLogs();
      if (action === "alerts") data = await getSecurityAlerts();
      setResult(data ?? { status: "OK" });
      setMessage("Request completed successfully.");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Request failed.");
      setResult(error.response?.data || null);
    }
  }

  return (
    <section>
      <div className="page-header">
        <p className="eyebrow">Microservice 4</p>
        <h2>Security & Access Logging</h2>
        <p className="subtitle">Validate requests, create logs, and view logs or alerts.</p>
      </div>

      <div className="form-card wide">
        <div className="form-grid">
          <label>Device ID<input value={deviceId} onChange={(e) => setDeviceId(e.target.value)} placeholder="Example: 1" /></label>
          <label>Request Type<select value={requestType} onChange={(e) => setRequestType(e.target.value)}><option value="CONTROL">CONTROL</option><option value="STATUS">STATUS</option><option value="MONITORING">MONITORING</option></select></label>
        </div>
        <div className="actions mt">
          <button type="button" onClick={() => runAction("validate")}>Validate Access</button>
          <button type="button" onClick={() => runAction("log")}>Create Log</button>
          <button type="button" onClick={() => runAction("logs")}>Get Logs</button>
          <button type="button" onClick={() => runAction("alerts")}>Get Alerts</button>
        </div>
      </div>

      {message && <p className="message">{message}</p>}
      {result && <pre className="result-box">{JSON.stringify(result, null, 2)}</pre>}
    </section>
  );
}
