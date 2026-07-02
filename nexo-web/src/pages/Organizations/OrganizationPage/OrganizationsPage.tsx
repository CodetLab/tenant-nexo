import { useEffect, useState } from "react";

import styles from "./OrganizationsPage.module.css";

import {
    getOrganizations,
} from "../../../services/organization.service";

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
};

export default function OrganizationsPage() {
    const [organizations, setOrganizations] =
        useState<Organization[]>([]);

    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [showEdit, setShowEdit] =
        useState(false);

    const [showInvite, setShowInvite] =
        useState(false);

    const [showMembers, setShowMembers] =
        useState(false);

    const [showLeave, setShowLeave] =
        useState(false);

    async function loadOrganizations() {
        try {
            setLoading(true);

            const data =
                await getOrganizations();

            setOrganizations(data);
        } catch (err) {
            console.error(err);
            setError(
                "No se pudieron cargar las organizaciones."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
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
                <p className={styles.error}>
                    {error}
                </p>
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
                    <h2>
                        No perteneces a ninguna organización.
                    </h2>

                    <p>
                        Crea una organización para comenzar.
                    </p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {organizations.map(
                        (organization) => (
                            <OrganizationCard
                                key={
                                    organization.id
                                }
                                organization={
                                    organization
                                }
                                onEdit={() => {
                                    setSelectedOrganization(
                                        organization
                                    );

                                    setShowEdit(
                                        true
                                    );
                                }}
                                onMembers={() => {
                                    setSelectedOrganization(
                                        organization
                                    );

                                    setShowMembers(
                                        true
                                    );
                                }}
                                onInvite={() => {
                                    setSelectedOrganization(
                                        organization
                                    );

                                    setShowInvite(
                                        true
                                    );
                                }}
                                onLeave={() => {
                                    setSelectedOrganization(
                                        organization
                                    );

                                    setShowLeave(
                                        true
                                    );
                                }}
                            />
                        )
                    )}
                </div>
            )}

            {selectedOrganization && (
                <>
                    <EditOrganizationModal
                        open={showEdit}
                        organization={
                            selectedOrganization
                        }
                        onClose={() =>
                            setShowEdit(false)
                        }
                        onUpdated={
                            loadOrganizations
                        }
                    />

                    <InviteMemberModal
                        open={showInvite}
                        organizationId={
                            selectedOrganization.id
                        }
                        onClose={() =>
                            setShowInvite(
                                false
                            )
                        }
                    />

                    <MembersModal
                        open={showMembers}
                        organizationId={
                            selectedOrganization.id
                        }
                        onClose={() =>
                            setShowMembers(
                                false
                            )
                        }
                    />

                    <LeaveOrganizationModal
                        open={showLeave}
                        organizationId={
                            selectedOrganization.id
                        }
                        onClose={() =>
                            setShowLeave(
                                false
                            )
                        }
                        onLeave={() => {
                            setShowLeave(
                                false
                            );

                            loadOrganizations();
                        }}
                    />
                </>
            )}
        </div>
    );
}