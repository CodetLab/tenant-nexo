import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor: Antes de que salga CUALQUIER petición al Backend Core,
// le mete el Tenant ID en los headers para que tu middleware de Express lo procese.
api.interceptors.request.use((config) => {
  const tenantSlug = localStorage.getItem("tenant_slug") || "default";
  
  if (tenantSlug) {
    config.headers["x-tenant-id"] = tenantSlug; 
    // O si usas API Keys en la fase 2: config.headers["x-api-key"] = ...
  }
  
  return config;
});

export default api;