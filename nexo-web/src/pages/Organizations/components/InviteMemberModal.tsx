import { useState } from "react";

import Modal from "./Modal/OrganizationModal";

import {
    invitationService,
} from "../../../services/invitation.service";

type Props = {
    open: boolean;
    organizationId: string;
    onClose: () => void;
};

export default function InviteMemberModal({
    open,
    organizationId,
    onClose,
}: Props) {
    const [email, setEmail] =
        useState("");

    const [role, setRole] =
        useState("member");

    const [loading, setLoading] =
        useState(false);

    async function submit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        const normalizedEmail =
            email.trim();

        if (!normalizedEmail) {
            return;
        }

        try {
            setLoading(true);

            await invitationService.create({
                resourceType: "organization",
                resourceId: organizationId,
                resourceAction: "join",
                email: normalizedEmail,
                role,
            });

            setEmail("");
            setRole("member");

            onClose();
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            open={open}
            title="Invitar miembro"
            onClose={onClose}
        >
            <form onSubmit={submit}>
                <input
                    type="email"
                    placeholder="correo@empresa.com"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                    disabled={loading}
                />

                <select
                    value={role}
                    onChange={(e) =>
                        setRole(e.target.value)
                    }
                    disabled={loading}
                >
                    <option value="member">
                        Member
                    </option>

                    <option value="admin">
                        Admin
                    </option>
                </select>

                <button
                    type="submit"
                    disabled={
                        loading ||
                        !email.trim()
                    }
                >
                    {loading
                        ? "Enviando..."
                        : "Enviar invitación"}
                </button>
            </form>
        </Modal>
    );
}