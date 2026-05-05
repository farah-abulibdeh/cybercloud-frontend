import { makeClient, requireBaseUrl } from "./http";

const BASE_URL = import.meta.env.VITE_SECURITY_API;
const api = makeClient(BASE_URL);

function ensureConfigured() {
  requireBaseUrl(BASE_URL, "Security & Access Logging Service");
}

export async function validateAccess(request) {
  ensureConfigured();
  const res = await api.post("/security/validate", request);
  return res.data;
}

export async function createAccessLog(log) {
  ensureConfigured();
  const res = await api.post("/security/logs", log);
  return res.data;
}

export async function getSecurityLogs() {
  ensureConfigured();
  const res = await api.get("/security/logs");
  return res.data;
}

export async function getSecurityAlerts() {
  ensureConfigured();
  const res = await api.get("/security/alerts");
  return res.data;
}
