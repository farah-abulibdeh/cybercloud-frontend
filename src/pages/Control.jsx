import { useState } from "react";
import {
  controlDevice,
  getDeviceConsumption,
  getDeviceState,
  getSystemStatus,
} from "../api/deviceControlApi.js";

export default function Control() {
  const [deviceId, setDeviceId] = useState("");
  const [state, setState] = useState("ON");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  async function runAction(action) {
    try {
      let data;
      if (action === "control") data = await controlDevice(deviceId, state);
      if (action === "state") data = await getDeviceState(deviceId);
      if (action === "consumption") data = await getDeviceConsumption(deviceId);
      if (action === "system") data = await getSystemStatus();
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
        <p className="eyebrow">Microservice 3</p>
        <h2>Device Control & Monitoring</h2>
        <p className="subtitle">Send control requests and retrieve monitoring data.</p>
      </div>

      <div className="form-card wide">
        <div className="form-grid">
          <label>Device ID<input value={deviceId} onChange={(e) => setDeviceId(e.target.value)} placeholder="Example: 1" /></label>
          <label>State<select value={state} onChange={(e) => setState(e.target.value)}><option value="ON">ON</option><option value="OFF">OFF</option></select></label>
        </div>
        <div className="actions mt">
          <button type="button" onClick={() => runAction("control")}>Send Control</button>
          <button type="button" onClick={() => runAction("state")}>Get State</button>
          <button type="button" onClick={() => runAction("consumption")}>Get Consumption</button>
          <button type="button" onClick={() => runAction("system")}>System Status</button>
        </div>
      </div>

      {message && <p className="message">{message}</p>}
      {result && <pre className="result-box">{JSON.stringify(result, null, 2)}</pre>}
    </section>
  );
}
