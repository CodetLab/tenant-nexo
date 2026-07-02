import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    createOrganization,
} from "../../../services/organization.service";

export default function CreateOrganizationPage() {
    const navigate =
        useNavigate();

    const [name, setName] =
        useState("");

    const [slug, setSlug] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        try {
            setLoading(true);

            await createOrganization({
                name,
                slug,
            });

            navigate("/", {
                replace: true,
            });
        } catch (error) {
            console.error(error);
            alert(
                "No se pudo crear la organización"
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
            <h1>
                Crear organización
            </h1>

            <p>
                No perteneces a ninguna
                organización.
            </p>

            <form
                onSubmit={handleSubmit}
            >
                <div>
                    <label>
                        Nombre
                    </label>

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        placeholder="Escuela Especial Nuevo Horizonte"
                    />
                </div>

                <div>
                    <label>
                        Slug
                    </label>

                    <input
                        value={slug}
                        onChange={(e) =>
                            setSlug(
                                e.target.value
                            )
                        }
                        placeholder="nuevo-horizonte"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Creando..."
                        : "Crear organización"}
                </button>
            </form>
        </div>
    );
}