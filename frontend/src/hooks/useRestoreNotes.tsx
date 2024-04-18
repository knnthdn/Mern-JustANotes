import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useOnCancelSelect from "./useOnCancelNotes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import restoreNotes from "@/services/restoreNotes";
import { toast } from "@/components/ui/use-toast";
import { CircleCheck } from "lucide-react";
import { resetNotes } from "@/utils/globalSlice";
import { Slice } from "@/types/sliceTypes";

function useRestoreNotes() {
  const { selected, isOnRead, notesId } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const queryClient = useQueryClient();
  const onCancelSelect = useOnCancelSelect();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: restoreNotes,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        description: (
          <div className="flex gap-2 items-center">
            <CircleCheck className="w-5 text-green-700" strokeWidth={3} />
            Notes Restored
          </div>
        ),
        variant: "success",
      });
      if (!isOnRead) return onCancelSelect();
      dispatch(resetNotes());
      navigate(-1);
    },
  });

  function onRestore() {
    const items = selected?.length > 0 ? selected : [{ _id: notesId }];
    mutate(items);
  }

  return { onRestore, isPending };
}
export default useRestoreNotes;
