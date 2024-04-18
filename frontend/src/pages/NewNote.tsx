import NotesNavFooter from "@/components/NotesNavFooter";
import NotesForm from "../components/NotesForm";
import OnNoteTab from "../components/OnNoteNav";
import { useSelector } from "react-redux";
import { Slice } from "@/types/sliceTypes";
import { useForm } from "react-hook-form";

export type FormInputs = {
  title: string;
  content: string;
};

function NewNote() {
  const { theme, fontSize } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const { register, handleSubmit, setFocus } = useForm<FormInputs>();

  const { bg, color } = theme;
  return (
    <div
      className={`h-dvh flex flex-col ${bg} ${color} ${fontSize} xmd:px-36 lg:px-40 xl:px-56 xxl:px-96`}
    >
      <OnNoteTab handleSubmit={handleSubmit} />
      <NotesForm register={register} setFocus={setFocus} />
      <NotesNavFooter />
    </div>
  );
}

export default NewNote;
