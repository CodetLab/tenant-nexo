import { useState } from "react";

import Modal from "./Modal/OrganizationModal";

import {
    inviteMember,
} from "../../../services/organization.service";

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

    const [loading, setLoading] =
        useState(false);

    async function submit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        try {
            setLoading(true);

            await inviteMember(
                organizationId,
                email
            );

            setEmail("");

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
            <form
                onSubmit={submit}
            >
                <input
                    type="email"
                    placeholder="correo@empresa.com"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <button
                    disabled={loading}
                >
                    Enviar invitación
                </button>
            </form>
        </Modal>
    );
}