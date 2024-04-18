import useToggleNotesList from "@/hooks/useToggleNoteList";
import NotesType from "@/types/notesItemsType";
import { Slice } from "@/types/sliceTypes";
import { formatDate } from "@/utils/formatDate";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function RecycledList({
  title,
  createdAt,
  content,
  _id,
  isRecycled,
  notesPreference,
}: NotesType) {
  const { isSelectAll, selected, onEditRecycle } = useSelector(
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
      {onEditRecycle && (
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
        <p className=" font-semibold">{title ? title : "Untitled"}</p>
        <span className="text-xs">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
}

export default RecycledList;
