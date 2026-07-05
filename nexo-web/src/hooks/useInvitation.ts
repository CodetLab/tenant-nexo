import { useQuery } from "@tanstack/react-query";
import { invitationService } from "../services/invitation.service";

export function useInvitation(token: string) {
    return useQuery({
        queryKey: ["invitation", token],
        queryFn: () => invitationService.getByToken(token),
        enabled: !!token,
        retry: false,
    });
}