import NotesType from "@/types/notesItemsType";
import { Slice } from "@/types/sliceTypes";
import {
  addToSelect,
  filterSelected,
  selectAll,
  storeNotes,
  toggleOnEdit,
  toggleOnEditRecycle,
} from "@/utils/globalSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function useToggleNotesList({
  title,
  content,
  _id,
  notesPreference,
  isRecycled,
}: NotesType) {
  const { onEdit, selected, onEditRecycle } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const [selectNotes, setSelectNotes] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  let LONG_CLICK_TIMEOUT: number;

  function handleLongPress() {
    LONG_CLICK_TIMEOUT = window.setTimeout(() => {
      if (pathname === "/recyclebin")
        return dispatch(toggleOnEditRecycle(true));

      if (pathname === "/notes") return dispatch(toggleOnEdit(true));
    }, 500);
  }

  function onClickNotes(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    clearInterval(LONG_CLICK_TIMEOUT);
    if (onEditRecycle || onEdit) return onSelect(event);
    dispatch(
      storeNotes({
        isOnRead: true,
        title,
        content,
        isRecycled,
        notesId: _id,
        theme: {
          bg: notesPreference?.theme.bg,
          color: notesPreference?.theme.color,
        },
        fontSize: notesPreference?.fontSize,
      })
    );
    if (!isRecycled) {
      dispatch(addToSelect([{ _id }]));
    }

    navigate("/newnote");
  }

  function onSelect(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();

    setSelectNotes(!selectNotes);
    dispatch(selectAll(false));
    if (!selectNotes) {
      dispatch(addToSelect([...(selected as []), { _id }]));
    } else {
      dispatch(filterSelected(_id));
    }
  }

  return {
    handleLongPress,
    onClickNotes,
    onSelect,
    selectNotes,
    setSelectNotes,
  };
}

export default useToggleNotesList;
