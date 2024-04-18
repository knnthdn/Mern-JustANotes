import { toast } from "@/components/ui/use-toast";
import createNotes from "@/services/createNotes";
import updateNotes from "@/services/updateNotes";
import { Slice } from "@/types/sliceTypes";
import { resetNotes } from "@/utils/globalSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type NewNotes = {
  title: string;
  content: string;
  notesId?: string;
  _id?: string;
};

function useToggleNotes() {
  const { title, content, isOnRead, notesId, theme, fontSize } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationKey: ["newNotes"],
    mutationFn: ({ title, content }: NewNotes) =>
      isOnRead
        ? updateNotes(title, content, notesId)
        : createNotes(title, content, theme, fontSize),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      toast({
        description: (
          <div className="flex gap-2 items-center">
            <CircleCheck className="w-5 text-green-600" strokeWidth={3} />
            {isOnRead ? "Changes Save" : "Notes created"}
          </div>
        ),
        variant: "success",
      });
      dispatch(resetNotes());
      navigate(-1);
    },
  });
  return { title, content, mutate };
}

export default useToggleNotes;
