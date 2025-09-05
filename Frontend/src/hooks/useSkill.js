import { useMutation } from "@tanstack/react-query";

export const useSkill = (mutationFn) => {
    return useMutation({ mutationFn });
}