import { toast } from "@/components/ui/use-toast";
import recycleNotes from "@/services/recyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import useOnCancelSelect from "./useOnCancelNotes";
import { Slice } from "@/types/sliceTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetNotes } from "@/utils/globalSlice";

function useRecyleNotes() {
  const { selected, isOnRead } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const onCancelSelect = useOnCancelSelect();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationKey: ["recycledNotes"],
    mutationFn: recycleNotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      toast({
        description: (
          <div className="flex gap-2 items-center">
            <Trash2 className="w-5 text-red-800" strokeWidth={3} />
            Selected Notes deleted
          </div>
        ),
      });
      if (!isOnRead) return onCancelSelect();
      dispatch(resetNotes());
      navigate(-1);
    },
  });

  function onRecycleNotes() {
    mutate(selected);
  }
  return onRecycleNotes;
}
export default useRecyleNotes;
