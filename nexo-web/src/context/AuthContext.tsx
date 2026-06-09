import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";

// Definimos la estructura de lo que va a tener nuestro contexto de autenticación
import type { User } from "../types/auth.types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginState: (token: string, userData: User) => void;
  logoutState: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al cargar la app, verificamos si ya existe un token guardado
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        // 💡 TIP: Aquí podrías hacer una petición rápida al backend tipo "/auth/me" 
        // para validar que el token no haya expirado y traer los datos frescos del usuario.
        // Por ahora, simulamos recuperando datos básicos del usuario si los guardaste.
        const savedUser = localStorage.getItem("user_data");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error restaurando la sesión:", error);
        logoutState();
      }
    }
    
    setLoading(false);
  }, []);

  // Función para guardar el estado cuando el login es exitoso
  const loginState = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
  };

  // Función para limpiar todo al cerrar sesión
  const logoutState = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginState, logoutState }}>
      {/* Si está cargando la validación del token inicial, podemos mostrar un spinner o nada */}
      {!loading ? children : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Cargando aplicación...</div>}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar la autenticación de forma súper simple
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}