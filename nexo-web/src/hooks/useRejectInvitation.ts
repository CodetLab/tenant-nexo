import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invitationService } from "../services/invitation.service";

export function useRejectInvitation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (token: string) =>
            invitationService.reject(token),

        onSuccess: (_, token) => {
            queryClient.invalidateQueries({
                queryKey: ["invitation", token],
            });
        },
    });
}