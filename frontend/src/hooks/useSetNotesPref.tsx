import setTheme from "@/services/setNotesPref";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useSetNotesPref() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["setTheme"],
    mutationFn: ({ id, pref }: { id: string | undefined; pref: object }) =>
      setTheme(id, pref),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  return { mutate, isPending };
}

export default useSetNotesPref;
