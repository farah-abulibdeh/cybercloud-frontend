import axios from "axios";

export function cleanBaseUrl(url) {
  if (!url || url.includes("PASTE-")) return "";
  return url.replace(/\/$/, "");
}

export function makeClient(baseUrl) {
  const cleaned = cleanBaseUrl(baseUrl);

  return axios.create({
    baseURL: cleaned,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 15000,
  });
}

export function requireBaseUrl(baseUrl, serviceName) {
  const cleaned = cleanBaseUrl(baseUrl);
  if (!cleaned) {
    throw new Error(`${serviceName} URL is not configured. Update .env.production.`);
  }
  return cleaned;
}
