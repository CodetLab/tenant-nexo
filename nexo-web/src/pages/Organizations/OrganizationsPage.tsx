import { useEffect, useState } from "react";

import styles from "./OrganizationsPage.module.css";

import { getOrganizations } from "../../services/organization.service";

type Organization = {
    id: string;
    name: string;
    slug: string;
    created_at?: string;
};

export default function OrganizationsPage() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadOrganizations() {
            try {
                const data = await getOrganizations();
                setOrganizations(data);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar las organizaciones.");
            } finally {
                setLoading(false);
            }
        }

        loadOrganizations();
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <p>Cargando organizaciones...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <p className={styles.error}>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Mis organizaciones</h1>
            </div>

            {organizations.length === 0 ? (
                <div className={styles.empty}>
                    <h2>No perteneces a ninguna organización.</h2>
                    <p>Crea una organización para comenzar.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {organizations.map((organization) => (
                        <div
                            key={organization.id}
                            className={styles.card}
                        >
                            <h2>{organization.name}</h2>

                            <span className={styles.slug}>
                                {organization.slug}
                            </span>

                            {organization.created_at && (
                                <p className={styles.date}>
                                    {new Date(
                                        organization.created_at
                                    ).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}