import styles from "./OrganizationCard.module.css";

type Organization = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  [key: string]: unknown;
};

type Props = {
  organization: Organization;
  isOwner: boolean;
  onEdit: () => void;
  onMembers: () => void;
  onInvite: () => void;
  onLeave: () => void;
  onDelete: () => void;
};

function formatValue(value: unknown): string {
  if (value === null) return "—";
  if (value === undefined) return "—";

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  if (typeof value === "boolean") {
    return value ? "Sí" : "No";
  }

  return String(value);
}

export default function OrganizationCard({
  organization,
  isOwner,
  onEdit,
  onMembers,
  onInvite,
  onLeave,
  onDelete,
}: Props) {
  const excludedFields = new Set(["id", "name", "slug", "created_at"]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2>{organization.name}</h2>

          <p className={styles.slug}>@{organization.slug}</p>

          <small className={styles.date}>
            Creada el{" "}
            {organization.created_at
              ? new Date(organization.created_at).toLocaleDateString()
              : "Fecha desconocida"}
          </small>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onMembers}>
          Miembros
        </button>

        <button type="button" onClick={onInvite}>
          Invitar
        </button>

        <button type="button" onClick={onEdit}>
          Configuración
        </button>

        {isOwner ? (
          <button type="button" className={styles.leave} onClick={onDelete}>
            Eliminar organización
          </button>
        ) : (
          <button type="button" className={styles.leave} onClick={onLeave}>
            Salir de la organización
          </button>
        )}
      </div>

      <details>
        <summary>Ver todos los datos recibidos</summary>

        <dl>
          <dt>ID</dt>
          <dd>{organization.id}</dd>

          <dt>Nombre</dt>
          <dd>{organization.name}</dd>

          <dt>Slug</dt>
          <dd>{organization.slug}</dd>

          <dt>Fecha de creación</dt>
          <dd>{organization.created_at || "—"}</dd>

          {Object.entries(organization)
            .filter(([key]) => !excludedFields.has(key))
            .map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>
                  <pre>{formatValue(value)}</pre>
                </dd>
              </div>
            ))}
        </dl>
      </details>
    </div>
  );
}
