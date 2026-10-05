import axios from "axios";

export function resolveError(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            return "No se pudo conectar con el servidor.";
        }

        switch (error.response.status) {
            case 400:
                return "La solicitud no es válida.";

            case 401:
                return "Tu sesión no es válida o ha expirado.";

            case 403:
                return "No tenés permisos para realizar esta acción.";

            case 404:
                return "El recurso solicitado no existe.";

            case 409:
                return "La operación entra en conflicto con datos existentes.";

            case 422:
                return "Los datos enviados no son válidos.";

            case 429:
                return "Demasiadas solicitudes. Intentá nuevamente más tarde.";

            case 500:
                return "Ocurrió un error interno en el servidor.";

            case 502:
            case 503:
            case 504:
                return "El servidor no está disponible en este momento.";

            default:
                return "Ocurrió un error al comunicarse con el servidor.";
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Ocurrió un error inesperado.";
}