import { formatDate } from "@/utils/formatDate";
import { useSelector } from "react-redux";
import { Slice } from "../types/sliceTypes";
import { useEffect, useState } from "react";
import { UseFormRegister, UseFormSetFocus } from "react-hook-form";
import { FormInputs } from "@/pages/NewNote";

type FormFn = {
  register: UseFormRegister<FormInputs>;
  setFocus: UseFormSetFocus<FormInputs>;
};

function NotesForm({ register, setFocus }: FormFn) {
  const { isOnRead, title, content, theme } = useSelector(
    (state: Slice) => state.persistedReducer
  );

  const [editNotes, setEditNotes] = useState<boolean>(true);
  const wordsCount = content.length && content.split(" ").length;

  useEffect(() => {
    if (!editNotes) {
      setFocus("content");
    }
  }, [editNotes, setFocus]);

  return (
    <form
      className={`flex flex-col px-4 gap-2 h-full bg-inherit text-inherit`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col text-xs gap-1">
        <input
          type="text"
          id="title"
          placeholder="Input Title..."
          className=" focus:outline-none text-3xl tracking-wide placeholder:opacity-45 bg-inherit md:text-4xl"
          autoFocus={!isOnRead}
          defaultValue={isOnRead ? title : undefined}
          {...register("title")}
        />
        <span className="text-gray-500">
          {formatDate(new Date(Date.now()))} | {wordsCount || 0}
        </span>
      </div>

      {isOnRead && (
        <button
          className={`ml-auto w-fit text-xs font-normal border border-${
            theme.color.split("-")[1]
          }  p-1
 rounded-md`}
          onClick={() => setEditNotes(!editNotes)}
        >
          {editNotes ? "edit note 📝" : "read-only📖"}
        </button>
      )}

      <textarea
        id="content"
        cols={50}
        rows={10}
        readOnly={!isOnRead ? false : editNotes}
        placeholder="Add notes..."
        className="resize-none grow focus:outline-none placeholder:opacity-45 text-black bg-inherit text-inherit  "
        spellCheck={false}
        defaultValue={isOnRead ? content : undefined}
        {...register("content")}
      ></textarea>
    </form>
  );
}

export default NotesForm;
