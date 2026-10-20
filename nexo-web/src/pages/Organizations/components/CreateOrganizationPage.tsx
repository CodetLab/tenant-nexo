
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrganization } from "../../../services/organization.service";

export default function CreateOrganizationPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        const normalizedName = name.trim();

        if (!normalizedName || normalizedName.length > 120) {
            setError(
                "El nombre debe tener entre 1 y 120 caracteres."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");

            await createOrganization({
                name: normalizedName,
            });

            navigate("/organizations", {
                replace: true,
            });
        } catch (err) {
            console.error("[ORGANIZATIONS:CREATE]", err);

            setError(
                "No se pudo crear la organización. Intentá nuevamente."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                maxWidth: 500,
                margin: "80px auto",
            }}
        >
            <h1>Crear organización</h1>

            <p>
                Creá una organización para comenzar a trabajar
                en Nexo.
            </p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="organization-name">
                        Nombre
                    </label>

                    <input
                        id="organization-name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Escuela Especial Nuevo Horizonte"
                        maxLength={120}
                        required
                        disabled={loading}
                    />
                </div>

                {error && (
                    <p role="alert" style={{ color: "red" }}>
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading || !name.trim()}
                >
                    {loading
                        ? "Creando..."
                        : "Crear organización"}
                </button>
            </form>
        </div>
    );
}
