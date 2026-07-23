import styles from "./OrganizationCard.module.css";

type Props = {
    organization: {
        id: string;
        name: string;
        slug: string;
        created_at: string;
    };

    onEdit: () => void;
    onMembers: () => void;
    onInvite: () => void;
    onLeave: () => void;
};

export default function OrganizationCard({
    organization,
    onEdit,
    onMembers,
    onInvite,
    onLeave,
}: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div>
                    <h2>{organization.name}</h2>

                    <p className={styles.slug}>
                        @{organization.slug}
                    </p>
                    <br />
                    <small className={styles.date}>
                        Creada el{" "}
                        {new Date(
                            organization.created_at
                        ).toLocaleDateString()}
                    </small>
                </div>
            </div>

            <div className={styles.actions}>
                <button onClick={onMembers}>
                    Miembros
                </button>

                <button onClick={onInvite}>
                    Invitar
                </button>

                <button onClick={onEdit}>
                    Configuración
                </button>

                <button
                    className={styles.leave}
                    onClick={onLeave}
                >
                    Salir de la organización
                </button>
            </div>
        </div>
    );
}