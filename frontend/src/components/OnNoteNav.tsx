import { Check, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { resetNotes } from "@/utils/globalSlice";
import useToggleNotes from "@/hooks/useCreateOrUpdateNotes";
import { UseFormHandleSubmit } from "react-hook-form";
import { FormInputs } from "@/pages/NewNote";

function OnNoteTab({
  handleSubmit,
}: {
  handleSubmit: UseFormHandleSubmit<FormInputs>;
}) {
  const { title, content, mutate } = useToggleNotes();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toCompare = useRef({ title, content });

  function onSaveNotes(data: FormInputs) {
    const { title, content } = data;
    mutate({ title, content });
  }

  function toggleBackBtn(data: FormInputs) {
    const { title, content } = data;
    if (
      toCompare.current.title !== title ||
      toCompare.current.content !== content
    ) {
      return mutate({ title, content });
    }
    dispatch(resetNotes());
    navigate(-1);
  }

  return (
    <nav className="flex justify-between p-4">
      <MoveLeft
        size="32"
        className="cursor-pointer hover:scale-[.95]"
        onClick={() => handleSubmit(toggleBackBtn)()}
      />
      <Check
        size="32"
        className="cursor-pointer hover:scale-[.95]"
        onClick={() => handleSubmit(onSaveNotes)()}
      />
    </nav>
  );
}

export default OnNoteTab;
