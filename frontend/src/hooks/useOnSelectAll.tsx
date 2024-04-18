import getAllUserNotes from "@/services/getAllUserNotes";
import { Slice } from "@/types/sliceTypes";
import {
  IdType,
  addToSelect,
  deselectAll,
  selectAll,
} from "@/utils/globalSlice";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function useOnSelectAll() {
  const dispatch = useDispatch();
  const { isSelectAll, selected, onEdit, onEditRecycle } = useSelector(
    (state: Slice) => state.persistedReducer
  );

  const { data: { data } = {} } = useQuery({
    queryKey: ["userNotes"],
    queryFn: getAllUserNotes,
  });

  const userNotes = data?.notes
    .map((items: IdType) => {
      if (selected.some((el: IdType) => el._id === items._id)) return;
      if (onEdit && items.isRecycled === true) return;
      if (onEditRecycle && items.isRecycled === false) return;
      return { _id: items._id };
    })
    .filter((el: undefined) => el !== undefined);

  function onSelectAll() {
    dispatch(selectAll(!isSelectAll));
    dispatch(addToSelect([...(selected as []), ...(userNotes as [])]));
    if (isSelectAll) return dispatch(deselectAll());
  }

  return { onSelectAll };
}

export default useOnSelectAll;
