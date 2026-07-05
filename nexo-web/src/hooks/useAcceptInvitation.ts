import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invitationService } from "../services/invitation.service";

export function useAcceptInvitation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (token: string) =>
            invitationService.accept(token),

        onSuccess: (_, token) => {
            queryClient.invalidateQueries({
                queryKey: ["invitation", token],
            });
        },
    });
}