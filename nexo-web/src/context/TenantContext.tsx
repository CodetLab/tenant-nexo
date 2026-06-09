import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface TenantContextType {
  tenantSlug: string | null;
  loadingTenant: boolean;
}

const TenantContext = createContext<TenantContextType | null>(null);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenantSlug, setTenantSlug] = useState<string | null>(null);
  const [loadingTenant, setLoadingTenant] = useState(true);

  useEffect(() => {
    let slug = 'nexo'; // Tenant por defecto 

    setTenantSlug(slug);
    
    // Guardamos en localStorage para que tu cliente de Axios lo pueda leer fácilmente
    localStorage.setItem("tenant_slug", slug);
    
    setLoadingTenant(false);
  }, []);

  return (
    <TenantContext.Provider value={{ tenantSlug, loadingTenant }}>
      {!loadingTenant && children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) throw new Error("useTenant debe usarse dentro de TenantProvider");
  return context;
}