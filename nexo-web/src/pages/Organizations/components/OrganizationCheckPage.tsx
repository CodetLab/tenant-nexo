import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
    getOrganizations,
} from "../../../services/organization.service";

export default function OrganizationCheckPage() {
    const navigate =
        useNavigate();

    useEffect(() => {
        async function load() {
            try {
                const organization =
                    await getOrganizations();

                if (!organization) {
                    navigate(
                        "/organizations/create",
                        {
                            replace: true,
                        }
                    );

                    return;
                }

                navigate("/", {
                    replace: true,
                });
            } catch (error) {
                console.error(error);

                navigate(
                    "/organizations/create",
                    {
                        replace: true,
                    }
                );
            }
        }

        load();
    }, [navigate]);

    return (
        <div>
            Verificando organización...
        </div>
    );
}