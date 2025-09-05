import { useMutation } from "@tanstack/react-query";

export const useProject = (mutationFn) => {
    return useMutation({ mutationFn });
}