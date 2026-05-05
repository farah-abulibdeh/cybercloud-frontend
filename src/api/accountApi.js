import { makeClient, requireBaseUrl } from "./http";

const BASE_URL = import.meta.env.VITE_ACCOUNT_HOME_API;
const api = makeClient(BASE_URL);

function ensureConfigured() {
  requireBaseUrl(BASE_URL, "Account & Home Service");
}

export async function createAccount(account) {
  ensureConfigured();
  const res = await api.post("/accounts", account);
  return res.data;
}

export async function getAccount(accountId) {
  ensureConfigured();
  const res = await api.get(`/accounts/${accountId}`);
  return res.data;
}

export async function createHome(home) {
  ensureConfigured();
  const res = await api.post("/accounts/homes", home);
  return res.data;
}

export async function createRoom(accountId, homeId, room) {
  ensureConfigured();
  const res = await api.post(`/account/${accountId}/homes/${homeId}/rooms`, room);
  return res.data;
}
