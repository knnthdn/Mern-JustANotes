import setTheme from "@/services/setNotesPref";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useSetNotesPref() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["setTheme"],
    mutationFn: ({ id, pref }: { id: string | undefined; pref: object }) =>
      setTheme(id, pref),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  return { mutate };
}

export default useSetNotesPref;
