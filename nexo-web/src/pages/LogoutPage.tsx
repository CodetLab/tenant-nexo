import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");

        navigate("/auth", {
            replace: true,
        });
    }, [navigate]);

    return <div><button
        onClick={() => {
            window.location.href =
                "/logout";
        }}
    >
        Cerrar sesión
    </button>Cerrando sesión...</div>;
}