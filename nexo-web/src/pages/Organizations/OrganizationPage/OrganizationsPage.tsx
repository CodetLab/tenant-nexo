import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./OrganizationsPage.module.css";

import { getOrganizations } from "../../../services/organization.service";

import OrganizationCard from "../components/OrganizationCard";
import EditOrganizationModal from "../components/EditOrganizationModal";
import InviteMemberModal from "../components/InviteMemberModal";
import MembersModal from "../components/MembersModal";
import LeaveOrganizationModal from "../components/LeaveOrganizationModal";

type Organization = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  [key: string]: unknown;
};

export default function OrganizationsPage() {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showLeave, setShowLeave] = useState(false);

  const loadOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrganizations();

      // Permite inspeccionar la respuesta real del backend.
      console.log("Organizaciones recibidas:", data);

      setOrganizations(data as Organization[]);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las organizaciones.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOrganizations();
  }, [loadOrganizations]);

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

        <button type="button" onClick={() => void loadOrganizations()}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mis organizaciones</h1>

        <button type="button" onClick={() => navigate("/organizations/create")}>
          Crear organización
        </button>
      </div>

      {organizations.length === 0 ? (
        <div className={styles.empty}>
          <p>No pertenecés a ninguna organización todavía.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {organizations.map((organization) => {
            /*
             * IMPORTANTE:
             * Adaptar esta condición a la respuesta real del backend.
             * No asumir que un campo de propietario existe hasta verificarlo.
             */
            const isOwner =
              organization.isOwner === true || organization.is_owner === true;

            return (
              <OrganizationCard
                key={organization.id}
                organization={organization}
                isOwner={isOwner}
                onEdit={() => {
                  setSelectedOrganization(organization);
                  setShowEdit(true);
                }}
                onMembers={() => {
                  setSelectedOrganization(organization);
                  setShowMembers(true);
                }}
                onInvite={() => {
                  setSelectedOrganization(organization);
                  setShowInvite(true);
                }}
                onLeave={() => {
                  setSelectedOrganization(organization);
                  setShowLeave(true);
                }}
                onDelete={() => {
                  // No eliminar hasta conectar el endpoint y confirmar.
                  window.alert(
                    "La eliminación de organizaciones todavía no está implementada.",
                  );
                }}
              />
            );
          })}
        </div>
      )}

      {selectedOrganization && (
        <>
          <EditOrganizationModal
            open={showEdit}
            organization={selectedOrganization}
            onClose={() => setShowEdit(false)}
            onUpdated={async () => {
              setShowEdit(false);
              await loadOrganizations();
            }}
          />

          <InviteMemberModal
            open={showInvite}
            organizationId={selectedOrganization.id}
            onClose={() => setShowInvite(false)}
          />

          <MembersModal
            open={showMembers}
            organizationId={selectedOrganization.id}
            onClose={() => setShowMembers(false)}
          />

          <LeaveOrganizationModal
            open={showLeave}
            organizationId={selectedOrganization.id}
            onClose={() => setShowLeave(false)}
            onLeave={async () => {
              setShowLeave(false);
              setSelectedOrganization(null);
              await loadOrganizations();
            }}
          />
        </>
      )}
    </div>
  );
}
