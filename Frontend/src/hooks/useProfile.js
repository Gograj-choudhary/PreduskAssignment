import { useMutation } from "@tanstack/react-query";

export const useProfile = (mutationFn) => {
    return useMutation({ mutationFn });
}