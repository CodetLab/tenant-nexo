import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMyOrganization,
} from "../services/organization.service";

export default function OrganizationGuard() {
    const navigate =
        useNavigate();

    useEffect(() => {
        async function check() {
            try {
                const organization =
                    await getMyOrganization();

                if (!organization) {
                    navigate(
                        "/organizations/create"
                    );
                    return;
                }

                navigate("/dashboard");
            } catch {
                navigate(
                    "/organizations/create"
                );
            }
        }

        check();
    }, [navigate]);

    return (
        <div>
            Cargando...
        </div>
    );
}