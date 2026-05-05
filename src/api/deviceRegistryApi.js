import { makeClient, requireBaseUrl } from "./http";

const BASE_URL = import.meta.env.VITE_DEVICE_REGISTRY_API;
const api = makeClient(BASE_URL);

function ensureConfigured() {
  requireBaseUrl(BASE_URL, "Device Registry Service");
}

export async function getAllDevices() {
  ensureConfigured();
  const res = await api.get("/devices");
  return res.data;
}

export async function getDevicesByRoom(roomId) {
  ensureConfigured();
  const res = await api.get(`/rooms/${roomId}/devices`);
  return res.data;
}

export async function createDevice(device) {
  ensureConfigured();
  const res = await api.post("/devices", device);
  return res.data;
}

export async function updateDevice(deviceId, device) {
  ensureConfigured();
  const res = await api.put(`/devices/${deviceId}`, device);
  return res.data;
}

export async function updateDeviceStatus(deviceId, status) {
  ensureConfigured();
  const res = await api.put(`/devices/${deviceId}/status`, { status });
  return res.data;
}

export async function deleteDevice(deviceId) {
  ensureConfigured();
  const res = await api.delete(`/devices/${deviceId}`);
  return res.data;
}
