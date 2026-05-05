import { useEffect, useState } from "react";
import {
  getAllDevices,
  createDevice,
  deleteDevice,
  updateDeviceStatus,
} from "../api/deviceRegistryApi";

function Devices() {
  const [devices, setDevices] = useState([]);

  const [form, setForm] = useState({
    homeId: "",
    roomId: "",
    name: "",
    type: "",
    status: true,
  });

  const [message, setMessage] = useState("");

  const loadDevices = async () => {
    try {
      const data = await getAllDevices();
      setDevices(Array.isArray(data) ? data : []);
      setMessage("Devices loaded successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to load devices.");
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDevice({
        homeId: Number(form.homeId),
        roomId: Number(form.roomId),
        name: form.name,
        type: form.type,
        status: form.status,
      });

      setForm({
        homeId: "",
        roomId: "",
        name: "",
        type: "",
        status: true,
      });

      setMessage("Device registered successfully.");
      loadDevices();
    } catch (error) {
      console.error(error);
      setMessage("Failed to register device.");
    }
  };

  const handleToggleStatus = async (device) => {
    try {
      const id = device.id || device.deviceId;
      const newStatus = !device.status;

      await updateDeviceStatus(id, newStatus);

      setMessage("Device status updated.");
      loadDevices();
    } catch (error) {
      console.error(error);
      setMessage("Failed to update device status.");
    }
  };

  const handleDelete = async (deviceId) => {
    try {
      await deleteDevice(deviceId);
      setMessage("Device deleted.");
      loadDevices();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete device.");
    }
  };

  return (
    <div>
      <h2>Device Registry</h2>
      <p className="subtitle">
        Register devices under a home and room, view devices, update status, and delete devices.
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <h3>Register Device</h3>

        <label>Home ID</label>
        <input
          value={form.homeId}
          onChange={(e) => setForm({ ...form, homeId: e.target.value })}
          placeholder="Example: 1"
          required
        />

        <label>Room ID</label>
        <input
          value={form.roomId}
          onChange={(e) => setForm({ ...form, roomId: e.target.value })}
          placeholder="Example: 1"
          required
        />

        <label>Device Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Example: Living Room Light"
          required
        />

        <label>Device Type</label>
        <input
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          placeholder="Example: LIGHT"
          required
        />

        <label>Status</label>
        <select
          value={String(form.status)}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value === "true" })
          }
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button type="submit">Register Device</button>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="table-card">
        <div className="table-header">
          <h3>Registered Devices</h3>
          <button onClick={loadDevices}>Refresh</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Home ID</th>
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
                <td colSpan="7">No devices registered yet.</td>
              </tr>
            ) : (
              devices.map((device) => {
                const id = device.id || device.deviceId;

                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{device.homeId}</td>
                    <td>{device.roomId}</td>
                    <td>{device.name}</td>
                    <td>{device.type}</td>
                    <td>{device.status ? "Active" : "Inactive"}</td>
                    <td className="actions">
                      <button onClick={() => handleToggleStatus(device)}>
                        Toggle Status
                      </button>

                      <button
                        className="danger"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Devices;