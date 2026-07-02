import Modal from "./Modal/OrganizationModal";

import {
    leaveOrganization,
} from "../../../services/organization.service";

type Props = {
    open: boolean;
    organizationId: string;

    onClose: () => void;

    onLeave: () => void;
};

export default function LeaveOrganizationModal({
    open,
    organizationId,
    onClose,
    onLeave,
}: Props) {
    async function leave() {
        await leaveOrganization(
            organizationId
        );

        onLeave();
    }

    return (
        <Modal
            open={open}
            title="Salir de la organización"
            onClose={onClose}
        >
            <p>
                ¿Seguro que deseas salir de
                esta organización?
            </p>

            <button
                onClick={leave}
            >
                Salir
            </button>
        </Modal>
    );
}