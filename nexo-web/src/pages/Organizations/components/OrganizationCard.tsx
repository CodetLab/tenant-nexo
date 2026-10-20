
import styles from "./OrganizationCard.module.css";

type Props = {
    organization: {
        id: string;
        name: string;
        slug: string;
        created_at: string;
    };
    isOwner: boolean;
    onEdit: () => void;
    onMembers: () => void;
    onInvite: () => void;
    onLeave: () => void;
    onDelete: () => void;
};

export default function OrganizationCard({
    organization,
    isOwner,
    onEdit,
    onMembers,
    onInvite,
    onLeave,
    onDelete,
}: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div>
                    <h2>{organization.name}</h2>

                    <p className={styles.slug}>
                        @{organization.slug}
                    </p>

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

                {isOwner ? (
                    <button
                        className={styles.leave}
                        onClick={onDelete}
                    >
                        Eliminar organización
                    </button>
                ) : (
                    <button
                        className={styles.leave}
                        onClick={onLeave}
                    >
                        Salir de la organización
                    </button>
                )}
            </div>
        </div>
    );
}
