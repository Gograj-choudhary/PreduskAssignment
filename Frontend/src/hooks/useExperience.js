import { useMutation } from "@tanstack/react-query";

export const useExperience = (mutationFn) => {
    return useMutation({ mutationFn });
}