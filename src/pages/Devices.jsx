import { useEffect, useState } from "react";
import {
  createDevice,
  deleteDevice,
  getAllDevices,
  updateDeviceStatus,
} from "../api/deviceRegistryApi.js";

function getDeviceId(device) {
  return device.deviceId ?? device.id ?? device.deviceID;
}

function getDeviceStatus(device) {
  if (typeof device.enabled === "boolean") return device.enabled;
  if (typeof device.status === "boolean") return device.status;
  if (typeof device.active === "boolean") return device.active;
  return false;
}

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    roomId: "",
    name: "",
    type: "LIGHT",
    enabled: true,
  });

  async function loadDevices() {
    try {
      setLoading(true);
      const data = await getAllDevices();
      setDevices(Array.isArray(data) ? data : []);
      setMessage("Devices loaded successfully.");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to load devices.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDevices();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      roomId: Number(form.roomId),
      name: form.name,
      type: form.type,
      enabled: form.enabled,
      status: form.enabled,
    };

    try {
      await createDevice(payload);
      setForm({ roomId: "", name: "", type: "LIGHT", enabled: true });
      setMessage("Device registered successfully.");
      await loadDevices();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || error.message || "Failed to register device.");
    }
  }

  async function handleToggle(device) {
    const id = getDeviceId(device);
    const newStatus = !getDeviceStatus(device);

    try {
      await updateDeviceStatus(id, newStatus);
      setMessage("Device status updated successfully.");
      await loadDevices();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || error.message || "Failed to update device status.");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDevice(id);
      setMessage("Device deleted successfully.");
      await loadDevices();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || error.message || "Failed to delete device.");
    }
  }

  return (
    <section>
      <div className="page-header">
        <p className="eyebrow">Microservice 2</p>
        <h2>Device Registry</h2>
        <p className="subtitle">Register, view, update status, and delete IoT devices.</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <h3>Register Device</h3>

        <div className="form-grid">
          <label>
            Room ID
            <input
              value={form.roomId}
              onChange={(event) => setForm({ ...form, roomId: event.target.value })}
              placeholder="Example: 1"
              required
            />
          </label>

          <label>
            Device Name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Example: Living Room Light"
              required
            />
          </label>

          <label>
            Device Type
            <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
              <option value="LIGHT">LIGHT</option>
              <option value="AC">AC</option>
              <option value="CAMERA">CAMERA</option>
              <option value="SENSOR">SENSOR</option>
              <option value="OTHER">OTHER</option>
            </select>
          </label>

          <label>
            Initial Status
            <select
              value={String(form.enabled)}
              onChange={(event) => setForm({ ...form, enabled: event.target.value === "true" })}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </label>
        </div>

        <button type="submit">Register Device</button>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="table-card">
        <div className="table-header">
          <h3>Registered Devices</h3>
          <button type="button" onClick={loadDevices} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Room ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-row">No devices registered yet.</td>
                </tr>
              ) : (
                devices.map((device) => {
                  const id = getDeviceId(device);
                  const active = getDeviceStatus(device);
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{device.roomId}</td>
                      <td>{device.name}</td>
                      <td>{device.type}</td>
                      <td><span className={`status-pill ${active ? "active" : "inactive"}`}>{active ? "Active" : "Inactive"}</span></td>
                      <td>
                        <div className="actions">
                          <button type="button" onClick={() => handleToggle(device)}>Toggle</button>
                          <button type="button" className="danger" onClick={() => handleDelete(id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
