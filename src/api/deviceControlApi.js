import { makeClient, requireBaseUrl } from "./http";

const BASE_URL = import.meta.env.VITE_DEVICE_CONTROL_API;
const api = makeClient(BASE_URL);

function ensureConfigured() {
  requireBaseUrl(BASE_URL, "Device Control & Monitoring Service");
}

export async function controlDevice(deviceId, state) {
  ensureConfigured();
  const res = await api.post(`/devices/${deviceId}/control`, { state });
  return res.data;
}

export async function getDeviceState(deviceId) {
  ensureConfigured();
  const res = await api.get(`/devices/${deviceId}/state`);
  return res.data;
}

export async function getDeviceConsumption(deviceId) {
  ensureConfigured();
  const res = await api.get(`/devices/${deviceId}/consumption`);
  return res.data;
}

export async function getSystemStatus() {
  ensureConfigured();
  const res = await api.get("/system/status");
  return res.data;
}
