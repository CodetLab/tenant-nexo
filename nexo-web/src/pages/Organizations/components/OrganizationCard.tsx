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

                    <span className={styles.slug}>
                        @{organization.slug}
                    </span>
                </div>

                <div className={styles.actions}>
                    <button onClick={onEdit}>
                        Editar
                    </button>

                    <button onClick={onMembers}>
                        Miembros
                    </button>

                    <button onClick={onInvite}>
                        Invitar
                    </button>

                    <button
                        className={styles.leave}
                        onClick={onLeave}
                    >
                        Salir
                    </button>
                </div>
            </div>

            <div className={styles.footer}>
                Creada el{" "}
                {new Date(
                    organization.created_at
                ).toLocaleDateString()}
            </div>
        </div>
    );
}