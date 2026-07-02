import { useState } from "react";

import Modal from "./Modal/OrganizationModal";

import {
    updateOrganization,
} from "../../../services/organization.service";

type Props = {
    open: boolean;
    organization: {
        id: string;
        name: string;
        slug: string;
    } | null;

    onClose: () => void;
    onUpdated: () => void;
};

export default function EditOrganizationModal({
    open,
    organization,
    onClose,
    onUpdated,
}: Props) {
    const [name, setName] = useState(
        organization?.name ?? ""
    );

    const [slug, setSlug] = useState(
        organization?.slug ?? ""
    );

    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        if (!organization) return;

        try {
            setLoading(true);

            await updateOrganization(
                organization.id,
                {
                    name,
                    slug,
                }
            );

            onUpdated();
            onClose();
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            open={open}
            title="Editar organización"
            onClose={onClose}
        >
            <form
                onSubmit={handleSubmit}
            >
                <label>

                    Nombre

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                </label>

                <label>

                    Slug

                    <input
                        value={slug}
                        onChange={(e) =>
                            setSlug(
                                e.target.value
                            )
                        }
                    />

                </label>

                <button
                    disabled={loading}
                >
                    Guardar
                </button>
            </form>
        </Modal>
    );
}