// src/pages/account/AccountPage.tsx

import { useEffect, useState } from "react";
import { getMe } from "../../../services/account.service"; // ajusta el import

interface User {
    id: string;
    name: string;
    email: string;
}

export default function AccountPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getMe();
                setUser(data);
            } catch {
                setError("No se pudo cargar la información de la cuenta.");
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ maxWidth: 600, margin: "2rem auto" }}>
            <h1>Mi Cuenta</h1>

            <div>
                <p>
                    <strong>ID:</strong> {user?.id}
                </p>

                <p>
                    <strong>Usuario:</strong> {user?.name}
                </p>

                <p>
                    <strong>Email:</strong> {user?.email}
                </p>

                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
        </div>
    );
}