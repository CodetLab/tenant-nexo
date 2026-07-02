import {
    useEffect,
    useState,
} from "react";

import Modal from "./Modal/OrganizationModal";

import {
    getOrganizationMembers,
    removeMember,
} from "../../../services/organization.service";

type Member = {
    role: string;

    profiles: {
        id: number;
        username: string;
        full_name: string;
        avatar_url?: string;
    };
};

type Props = {
    open: boolean;

    organizationId: string;

    onClose: () => void;
};

export default function MembersModal({
    open,
    organizationId,
    onClose,
}: Props) {
    const [members, setMembers] =
        useState<Member[]>([]);

    const [loading, setLoading] =
        useState(false);

    async function loadMembers() {
        try {
            setLoading(true);

            const data =
                await getOrganizationMembers(
                    organizationId
                );

            setMembers(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!open) return;

        loadMembers();
    }, [open]);

    async function handleRemove(
        profileId: number
    ) {
        const ok = window.confirm(
            "¿Eliminar este miembro?"
        );

        if (!ok) return;

        await removeMember(
            organizationId,
            profileId
        );

        loadMembers();
    }

    return (
        <Modal
            open={open}
            title="Miembros"
            onClose={onClose}
        >
            {loading ? (
                <p>Cargando...</p>
            ) : members.length === 0 ? (
                <p>
                    No hay miembros.
                </p>
            ) : (
                <table
                    style={{
                        width: "100%",
                    }}
                >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {members.map(
                            (member) => (
                                <tr
                                    key={
                                        member
                                            .profiles
                                            .id
                                    }
                                >
                                    <td>
                                        {
                                            member
                                                .profiles
                                                .full_name
                                        }
                                    </td>

                                    <td>
                                        @
                                        {
                                            member
                                                .profiles
                                                .username
                                        }
                                    </td>

                                    <td>
                                        {member.role}
                                    </td>

                                    <td>
                                        {member.role !==
                                            "owner" && (
                                                <button
                                                    onClick={() =>
                                                        handleRemove(
                                                            member
                                                                .profiles
                                                                .id
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
        </Modal>
    );
}