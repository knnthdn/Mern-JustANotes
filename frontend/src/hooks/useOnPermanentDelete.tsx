import deleteNotes from "@/services/deleteNotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useOnCancelSelect from "./useOnCancelNotes";
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { Slice } from "@/types/sliceTypes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetNotes } from "@/utils/globalSlice";

function useOnPermanentDelete() {
  const { selected, notesId, isOnRead } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const onCancelSelect = useOnCancelSelect();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: deleteNotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      toast({
        description: (
          <div className="flex gap-2 items-center">
            <Trash2 className="w-5 text-red-800" strokeWidth={3} />
            Selected Notes Permanently Deleted
          </div>
        ),
      });
      if (!isOnRead) return onCancelSelect();
      dispatch(resetNotes());
      navigate(-1);
    },
  });

  function onPermanentDelete() {
    const items = selected?.length > 0 ? selected : [{ _id: notesId }];
    mutate(items);
  }
  return onPermanentDelete;
}

export default useOnPermanentDelete;
