import { formatDate } from "@/utils/formatDate";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Slice } from "../types/sliceTypes";
import { useEffect } from "react";
import { Check } from "lucide-react";
import NotesType from "@/types/notesItemsType";
import useToggleNotesList from "@/hooks/useToggleNoteList";

function Notes({
  title,
  createdAt,
  content,
  _id,
  notesPreference,
  isRecycled,
}: NotesType) {
  const { onEdit, selected, isSelectAll } = useSelector(
    (state: Slice) => state.persistedReducer
  );

  const {
    handleLongPress,
    onClickNotes,
    onSelect,
    selectNotes,
    setSelectNotes,
  } = useToggleNotesList({
    title,
    content,
    createdAt,
    _id,
    notesPreference,
    isRecycled,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSelectAll) {
      setSelectNotes(true);
    } else if (selected.length === 0) {
      setSelectNotes(false);
    }
  }, [dispatch, isSelectAll, selectNotes, selected, setSelectNotes]);

  return (
    <div
      role="listitem"
      className="bg-gray-200 px-3 py-2 rounded-xl flex items-center gap-4 shadow cursor-pointer hover:shadow-md sm:px-5 lg:py-3 lg:bg-300"
      onClick={(event) => onClickNotes(event)}
      onTouchStart={handleLongPress}
      onMouseDown={handleLongPress}
    >
      {onEdit && (
        <div
          role="button"
          className={`size-4 rounded-sm border border-black grid place-content-center ${
            selectNotes && "bg-black"
          }`}
          onClick={(event) => onSelect(event)}
        >
          {selectNotes && <Check className="text-white w-3" />}
        </div>
      )}
      <div className="flex flex-col">
        <p className=" font-semibold md:text-lg" unselectable="on">
          {title ? title : "Untitled"}
        </p>
        <span className="text-xs md:text-sm">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
}

export default Notes;
